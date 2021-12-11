import React, { useState } from 'react';

import RemoveSvg from '../assets/img/remove.svg';

const SidebarItem = ({ id, src, alt, hex, isDeletable, title, onDelete}) => {
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);

    const handleListDelete = () => {
        onDelete(id);
    }

    return (
        <button onClick={() => setActiveBtn(true)}
            className={`bar__item ${activeBtn ? 'bar__item-active' : ''}`}
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