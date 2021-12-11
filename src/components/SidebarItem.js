import React, { useState } from 'react';

import RemoveSvg from '../assets/img/remove.svg';

const SidebarItem = ({ src, alt, hex, isDeleteble, title}) => {
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [activeBtn, setActiveBtn] = useState(false);

    return (
        <button className={`bar__item ${activeBtn ? 'bar__item-active' : ''}`}
                onClick={() => setActiveBtn(true)}
                onMouseEnter={() => setDeleteBtn(true)}
                onMouseLeave={() => setDeleteBtn(false)}>
            {src && <img className='icon' src={src} alt={alt}/>} 
            {hex && <div style={{background: hex}}></div>} 
            <span>{title}</span>
            {isDeleteble && <img className={`remove ${deleteBtn ? 'visible' : 'hidden'}`} src={RemoveSvg} alt={'remove'}/>}
        </button>
    );
  }
  
  
  export default SidebarItem;