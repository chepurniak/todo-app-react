import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SidebarItem from './components/SidebarItem';
import List from './components/List';

import ListSvg from './assets/img/list.svg';
import AddSvg from './assets/img/add.svg';

import './reset.scss';
import './app.scss';

function App() {

  const [lists, setLists] = useState(null);
  const [activeList, setActiveList] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    
  }, []);

  const handleListActive = (id) => {
    console.log('active '+id)
    setActiveList(id)
  }

  const handleListDelete = (id) => {
    console.log('del '+id)
  }

  return (
    <>
    <div className='app'>
      
      <div className='app__sidebar overflow-y'>
        <div>
          <SidebarItem
            title={'All tasks'}
            src={ListSvg} 
            alt={'list icon'}
            onActive={handleListActive}
            isActive={activeList === 0}
            isAllTasks 
          />
          
          <ul className='bar__list'>
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

          <button className='bar__item  bar__item_with-img'>
            <img src={AddSvg} alt='list icon'/> 
            <span>Add list</span>
          </button>

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

      

      
    </div>
    </>
  );
}

export default App;