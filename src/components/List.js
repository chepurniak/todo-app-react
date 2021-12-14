import React, { useState } from 'react';

import Task from './Task';
import ListTitle from './ListTitle';

const List = ({ id, name, hex, tasks, onListEdit }) => {

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
        <div className={'tasks'}>    
            <ListTitle
            id={id} 
            name={name} 
            hex={hex}
            onListEdit={onListEdit}/>
            <div className='tasks__wrapper'>
                {tasks.length!==0 ? tasks.map(({text, completed, id})=>(
                    <Task
                        key={id}
                        id={id}
                        text={text}
                        completed={completed}
                    />
                )
                ): <p className={'no-lists'}>No tasks</p>}
            </div>
        </div>
    );
}

export default List;