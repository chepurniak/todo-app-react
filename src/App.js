import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SidebarItem from './components/SidebarItem';

import ListSvg from './assets/img/list.svg';
import AddSvg from './assets/img/add.svg';

import './reset.scss';
import './app.scss';

function App() {

  const [lists, setLists] = useState(null);
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

  const handleListDelete = (id) => {
    console.log('del '+id)
  }

  const getColorHex = (id) => {
    const color = colors.filter( item => item.id === id );
    return color[0] ? color[0].hex : '#C9D1D3'
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
          />
          
          <ul className='bar__list'>
          {lists ? lists.map(
            ({id, name, colorId, tasks}) => (
              <li key={id}>
                <SidebarItem
                  id={id}
                  title={name}
                  hex={getColorHex(colorId)}
                  onDelete={handleListDelete}
                  isDeletable
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

      <div className='app__tasks overflow-y'></div>

      

      
    </div>
    </>
  );
}


export default App;