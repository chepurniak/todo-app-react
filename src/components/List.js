import React from 'react';

import Task from './Task';
import ListTitle from './ListTitle';

const List = ({ id, name, hex, tasks, onListEdit, onTaskComplete, onTaskDelete }) => {

    const handleTaskComplete = (taskId, isCompleted) => {
        onTaskComplete(id, taskId, isCompleted);
    }

    const handleTaskDelete = (taskId) => {
        onTaskDelete(id, taskId);
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
                        onTaskComplete={handleTaskComplete}
                        onTaskDelete={handleTaskDelete}
                    />
                )): <p className={'no-lists'}>No tasks</p>}
                
            </div>
        </div>
    );
}

export default List;