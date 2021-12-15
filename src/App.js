import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { SidebarItem, List, AddList, AddListForm } from './components';

import ListSvg from './assets/img/list.svg';

import './reset.scss';
import './app.scss';

function App() {

  //const JSON_API = 'http://localhost:8000';
  const JSON_API = 'https://to-do-applic.herokuapp.com';

  const [lists, setLists] = useState(null);
  const [activeList, setActiveList] = useState(parseInt(localStorage.getItem('activeList')) || 0);
  const [showListForm, setShowListForm] = useState(false);
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${JSON_API}/lists?_expand=color&_embed=tasks`)
      .then(({ data }) => {
        setLists(data);
        if(!localStorage.getItem('activeList')){setActiveList(data[0].id);}
    });
    axios.get(`${JSON_API}/colors`)
      .then(({ data }) => {
      setColors(data);
    });
  }, []);

  const toggleListAddForm = () => {
    showListForm ? setShowListForm(false) : setShowListForm(true);
}

  const handleListActive = (id) => {
    localStorage.setItem('activeList', id);
    setActiveList(id);
  }

  const handleListAdd = (title, color) => {
    setIsLoading(true);
    axios.post(`${JSON_API}/lists`, {
      name: title,
      colorId: color
    }).then(({ data }) => {
      const newList = { 
        ...data, 
        tasks: [], 
        color: colors.filter(c => c.id === color)[0] 
      };
      setLists([...lists, newList]);
      handleListActive(data.id);
    })
    .catch(() => {
      alert('Error');
    })
    .finally(() => {
      toggleListAddForm();
      setIsLoading(false);
    });
  }

  const handleListEdit = (id, title) => {
    const editedList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(editedList);
    setIsLoading(true);

    axios.patch(`${JSON_API}/lists/` + id, {
      name: title
    })
    .catch(() => {
      alert('Error by title editing :(');
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const handleListDelete = (id) => {
    axios.delete(`${JSON_API}/lists/` + id)
    .then(() => {
      const newLists = lists.filter(list => list.id !== id);
      setLists(newLists);
      setActiveList(0);
    });
  }

  const handleTaskAdd = (listId, title) => {
    setIsLoading(true);
    axios
      .post(`${JSON_API}/tasks`, {
        listId: listId,
        text: title,
        completed: false
      })
      .then(({ data }) => {
        const newList = lists.map(item => {
          if (item.id === listId) {
            item.tasks = [...item.tasks, data];
          }
          return item;
        });
        setLists(newList);        
      })
      .catch(e => {
        alert('Error by task edding :(');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleTaskComplete = (listId, taskId, isCompleted) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = isCompleted;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    setIsLoading(true);

    axios
      .patch(`${JSON_API}/tasks/` + taskId, {
        completed: isCompleted
      })
      .catch(() => {
        alert('Error by updating the task :(');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleTaskDelete = (listId, taskId) => {
    const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      setIsLoading(true);
      
      axios.delete(`${JSON_API}/tasks/` + taskId)
      .catch(() => {
        alert('Error by task deleting :(');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
    {window.screen.width > 1023 ? <div className='app'>
      
      <div className='app__sidebar'>
        <div>
          {(lists && lists.length > 1) && <SidebarItem
            title={'All tasks'}
            src={ListSvg} 
            alt={'list icon'}
            onActive={handleListActive}
            isActive={activeList === 0}
            isAllTasks 
          />}
          
          <ul className='bar__list overflow-y'>
          {lists && lists.length > 0 ? lists.map(
            ({id, name, color}) => (
              <li key={id}>
                <SidebarItem
                  id={id}
                  title={name}
                  hex={color.hex}
                  onDelete={handleListDelete}
                  onActive={handleListActive}
                  isDeletable
                  isActive={activeList === id} 
                />
              </li>
            )) : 
            <li>
              <p className={'no-lists no-lists_title'}>No lists </p>
              <p className={'no-lists'}>Create your first list</p>
            </li>}
          </ul>

          <AddList
          toggleListAdd={toggleListAddForm}/>

        </div>

      </div>

      <div className='app__tasks overflow-y'>
        
      {lists && lists.length > 0
        ? (activeList === 0  
          ? lists.map(
            ({id, name, tasks, color}) => (
              <List
                key={`${id}_from_all`}
                id={id}
                name={name}
                hex={color.hex}
                tasks={tasks}
                onListEdit={handleListEdit}
                onTaskAdd={handleTaskAdd}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
              />
            ))   
          : lists.filter(list => list.id === activeList)
            .map(
              ({id, name, tasks, color}) => (
              <List
                key={id}
                id={id}
                name={name}
                hex={color.hex}
                tasks={tasks}
                onListEdit={handleListEdit}
                onTaskAdd={handleTaskAdd}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
              />
            ))
          )
        :<>
          <p className={'no-lists no-lists_big'}>No lists</p>
          <p className={'no-lists'}>Create your first list</p>
        </>
      }

      </div>

      

      {showListForm && 
          <AddListForm
          onClose={toggleListAddForm}
          onAdd={handleListAdd}
          colors={colors}
          isLoading={isLoading}/>}
    </div> : <p>Please open the application on display with width bigger than 1024px</p>}
    </>
  );
}

export default App;