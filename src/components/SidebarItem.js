import React, { useState } from 'react';

import RemoveSvg from '../assets/img/remove.svg';

const SidebarItem = ({ id, title, src, alt, hex, onDelete, onActive, isAllTasks, isDeletable, isActive}) => {
    
    const [deleteBtn, setDeleteBtn] = useState(false);

    const handleListActive = () => {
        isAllTasks ? onActive(0) : onActive(id);
    }

    const handleListDelete = () => {
        onDelete(id);
    }

    return (
        <button onClick={handleListActive}
            className={`bar__item ${isActive ? 'bar__item_active' : ''}`}
            onMouseEnter={() => setDeleteBtn(true)}
            onMouseLeave={() => setDeleteBtn(false)}>
            {src && 
                <img className='icon' src={src} alt={alt}/>} 
            {hex && 
                <div style={{background: hex}}></div>} 
            <span>{title}</span>
            {isDeletable && deleteBtn &&
                <img onClick={handleListDelete}
                    className={`remove ${deleteBtn ? 'visible' : 'hidden'}`} 
                    src={RemoveSvg} 
                    alt={'remove list icon'}/>}
        </button>
    );
  }
  
  
  export default SidebarItem;