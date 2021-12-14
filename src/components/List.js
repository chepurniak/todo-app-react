import React from 'react';

import { Task, ListTitle, AddTask } from '.';

const List = ({ id, name, hex, tasks, onListEdit, onTaskAdd, onTaskComplete, onTaskDelete }) => {

    const handleTaskAdd = (title) => {
        onTaskAdd(id, title);
    }

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
                )): <p className={'no-tasks'}>No tasks</p>}
                <AddTask name={name} onTaskAdd={handleTaskAdd}/>
            </div>
        </div>
    );
}

export default List;