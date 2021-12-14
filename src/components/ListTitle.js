import React, { useState } from 'react';

import EditSvg from '../assets/img/edit.svg';
import RoundedCheckSvg from '../assets/img/rounded-check.svg';

const ListTitle = ({ id, name, hex, onListEdit }) => {

    const [title, setTitle] = useState(name);
    const [isEditable, setIsEditable] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const [confirmBtn, setConfirmBtn] = useState(false);

    const handleListEdit = () => {
        setConfirmBtn(false); 
        setIsEditable(false);
        setEditBtn(false);
        onListEdit(id, title);
    }

    return(
        <div className='tasks__title' 
                onMouseEnter={() => setEditBtn(true)}
                onMouseLeave={() => setEditBtn(false)}>
                <input type={'text'}
                    className={'tasks__input'}
                    style={{color: hex, borderBottom: `2px solid ${isEditable ? hex : 'transparent'}`}}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={e => {if(e.key === 'Enter'){handleListEdit()}}}
                    disabled={!isEditable}
                />
                {editBtn && !isEditable && <img 
                    onClick={() => {setIsEditable(true); setConfirmBtn(true)}} 
                    className={'tasks__edit'}
                    src={EditSvg} 
                    alt='list icon'/>}
                {confirmBtn && isEditable && <img 
                    onClick={() => handleListEdit()}
                    className={'tasks__edit'}
                    src={RoundedCheckSvg} 
                    alt='list icon'/>}
            </div>
    )
}

export default ListTitle;