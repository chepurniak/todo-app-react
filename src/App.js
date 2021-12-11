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
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);


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
            <li>
              <SidebarItem
                title={'Task 1'}
                hex={'#B6E6BD'}
                isDeleteble
              />
            </li>
            <li>
              <SidebarItem
                title={'Task 1'}
                hex={'#B6E6BD'}
                isDeleteble
              />
            </li>
            <li>
              <SidebarItem
                title={'Task 1'}
                hex={'#B6E6BD'}
                isDeleteble
              />
            </li>
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