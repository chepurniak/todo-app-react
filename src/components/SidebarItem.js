import React, { useState } from 'react';

import RemoveSvg from '../assets/img/remove.svg';

const SidebarItem = ({ id, src, alt, hex, title, onDelete, onActive, isAllTasks, isDeletable, isActive}) => {
    const [deleteBtn, setDeleteBtn] = useState(false);
    //const [activeBtn, setActiveBtn] = useState(false);

    const handleListActive = () => {
        isAllTasks ? onActive(0) : onActive(id);
    }

    const handleListDelete = () => {
        onDelete(id);
    }

    return (
        <button onClick={handleListActive}
            className={`bar__item ${isActive ? 'bar__item-active' : ''}`}
            onMouseEnter={() => setDeleteBtn(true)}
            onMouseLeave={() => setDeleteBtn(false)}>
            {src && 
                <img className='icon' src={src} alt={alt}/>} 
            {hex && 
                <div style={{background: hex}}></div>} 
            <span>{title}</span>
            {isDeletable && 
                <img onClick={handleListDelete}
                    className={`remove ${deleteBtn ? 'visible' : 'hidden'}`} 
                    src={RemoveSvg} 
                    alt={'remove'}/>}
        </button>
    );
  }
  
  
  export default SidebarItem;