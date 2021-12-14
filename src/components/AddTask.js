import { React, useState } from 'react';

import AddSvg from '../assets/img/add.svg';

const AddTask = ({ name, onTaskAdd }) => {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');

    const closeForm = () => {
        setTitle('');
        setShowForm(false);
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        onTaskAdd(title);
        closeForm();
    }

    return(
        <div className={'add-task__wrapper'}>
            {!showForm ? 
            <button onClick={() => setShowForm(true)}
                className={'add-task__new'}>
                <img src={AddSvg} alt='add task icon'/> 
                <span>New task</span>
            </button> :
            <form onSubmit={(e) => handleAddTask(e)}>
                <input
                    required={true}
                    placeholder={`Enter a new task in ${name}`}
                    className={'add-task__input'} 
                    type={'text'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                <button 
                    type={'submit'}
                    className={'add-task__submit'}>
                    <span>Add task</span>
                </button>
                <button 
                    onClick={() => closeForm()}
                    className={'add-task__cancel'}>
                    <span>Cancel</span>
                </button>
            </form>
            }
        </div>
    )

}

export default AddTask;