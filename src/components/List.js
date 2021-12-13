import React, { useState } from 'react';

import Task from './Task';

const List = ({ id, name, hex, tasks }) => {

    return(
        <div className={'tasks'}>    
            <h2 className='tasks__title' style={{color: hex}}>
                {name}
            </h2>
            <div className='tasks__wrapper'>
                {tasks.length!==0 ? tasks.map(({text, completed, id})=>(
                    <Task
                        key={id}
                        id={id}
                        text={text}
                        completed={completed}
                    />
                )): <p className={'no-lists'}>No tasks</p>}
            </div>
        </div>
    );
}

export default List;