import React, { useState } from 'react';

import RemoveSvg from '../assets/img/remove.svg';

const Task = ({ id, text, completed, onTaskComplete, onTaskDelete}) => {
    
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [isAttention, setIsAttention] = useState(false);
    const [completedTask, setCompletedTask] = useState(completed);

    return(
        <div key={id}
            className='tasks__task' 
            onMouseEnter={() => setDeleteBtn(true)}
            onMouseLeave={() => setDeleteBtn(false)}>
            <input 
                type='checkbox' 
                className='custom-checkbox' 
                name='tasks' 
                onChange={function(){}}
                value={id}
                checked={completedTask}/>
            <label 
                onClick={() => {setCompletedTask(!completedTask); onTaskComplete(id, !completedTask)}}
                className={`${isAttention ? 'close' : ''}`}  
                htmlFor={id}>{text}
            </label>
            {deleteBtn &&
                <img onClick={() => onTaskDelete(id)}
                    onMouseEnter={() => setIsAttention(true)}
                    onMouseLeave={() => setIsAttention(false)}
                    className={`tasks__delete ${deleteBtn ? 'visible' : 'hidden'}`} 
                    src={RemoveSvg} 
                    alt={'remove task icon'}/>}
        </div>
    )
}

export default Task;