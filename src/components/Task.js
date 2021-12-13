import React, { useState, useEffect } from 'react';

const Task = ({ text, completed, id }) => {

    const [completedTask, setCompletedTask] = useState(false);

    useEffect(() => {
        completed ? setCompletedTask(true) : setCompletedTask(false);
    }, [completed]);

    const updateComplete = () => {
        completedTask ? setCompletedTask(false) : setCompletedTask(true);
    }

    return(
        <div key={id}
            className='tasks__task' 
            onClick={() => updateComplete()}>
            <input 
                type='checkbox' 
                className='custom-checkbox' 
                name='tasks' 
                onChange={function(){}}
                value={id}
                checked={completedTask}/>
            <label htmlFor='happy'>{text}</label>
        </div>
    )
}

export default Task;