import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SidebarItem from './components/SidebarItem';
import List from './components/List';
import AddList from './components/AddList';
import AddListForm from './components/AddListForm';

import ListSvg from './assets/img/list.svg';

import './reset.scss';
import './app.scss';

function App() {

  const [lists, setLists] = useState(null);
  const [activeList, setActiveList] = useState(0);
  const [showListForm, setShowListForm] = useState(false);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
    });
    axios.get('http://localhost:3001/colors')
      .then(({ data }) => {
      setColors(data);
    });
  }, []);

  const toggleListAdd = () => {
    showListForm ? setShowListForm(false) : setShowListForm(true);
}

  const handleListActive = (id) => {
    setActiveList(id);
  }

  const handleListAdd = (title, color) => {
    console.log('add '+ title + ' ' + color);
  }

  const handleListDelete = (id) => {
    console.log('del '+ id);
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
          toggleListAdd={toggleListAdd}/>

        </div>

      </div>

      <div className='app__tasks overflow-y'>
        
      {lists
        ? (activeList === 0  
          ? lists.map(
            ({id, name, tasks, color}) => (
              <List
                key={id}
                id={id}
                name={name}
                hex={color.hex}
                tasks={tasks}
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
          colors={colors}/>}
    </div>
    </>
  );
}

export default App;