import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { SidebarItem, List, AddList, AddListForm } from './components';

import ListSvg from './assets/img/list.svg';

import './reset.scss';
import './app.scss';

function App() {

  const [lists, setLists] = useState(null);
  const [activeList, setActiveList] = useState(0);
  const [showListForm, setShowListForm] = useState(false);
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
        setActiveList(data[0].id);
    });
    axios.get('http://localhost:3001/colors')
      .then(({ data }) => {
      setColors(data);
    });
  }, []);

  const toggleListAddForm = () => {
    showListForm ? setShowListForm(false) : setShowListForm(true);
}

  const handleListActive = (id) => {
    setActiveList(id);
  }

  const handleListAdd = (title, color) => {
    setIsLoading(true);
    axios.post('http://localhost:3001/lists', {
      name: title,
      colorId: color
    }).then(({ data }) => {
      const newList = { 
        ...data, 
        tasks: [], 
        color: colors.filter(c => c.id === color)[0] 
      };
      setLists([...lists, newList]);
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

    axios.patch('http://localhost:3001/lists/' + id, {
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
    axios.delete('http://localhost:3001/lists/' + id)
    .then(() => {
      const newLists = lists.filter(list => list.id !== id);
      setLists(newLists);
      setActiveList(0);
    });
  }

  const handleTaskAdd = () => {

  }

  const handleTaskComplete = () => {
    
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
      
      axios.delete('http://localhost:3001/tasks/' + taskId)
      .catch(() => {
        alert('Error by task deleting :(');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
    <div className='app'>
      
      <div className='app__sidebar'>
        <div>
          <SidebarItem
            title={'All tasks'}
            src={ListSvg} 
            alt={'list icon'}
            onActive={handleListActive}
            isActive={activeList === 0}
            isAllTasks 
          />
          
          <ul className='bar__list overflow-y'>
          {lists ? lists.map(
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
              <p className={'no-lists no-lists_title'}>No lists :(</p>
              <p className={'no-lists'}>Create your first list</p>
            </li>}
          </ul>

          <AddList
          toggleListAdd={toggleListAddForm}/>

        </div>

      </div>

      <div className='app__tasks overflow-y'>
        
      {lists
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
                onTaskDelete={handleTaskDelete}
              />
            ))
          )
        :<>
          <p className={'no-lists no-lists_title'}>No lists :(</p>
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
    </div>
    </>
  );
}

export default App;