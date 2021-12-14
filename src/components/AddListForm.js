import React, { useState } from 'react';

import CloseSvg from '../assets/img/close.svg';

const AddListForm = ({colors, onClose, onAdd, isLoading}) => {

    const [activeColor, setActiveColor] = useState(2);
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitle('');
        onAdd(title, activeColor);
    }

    return(
        <div className={'add-list__form'}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className={'add-list__input'}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    disabled={isLoading}
                />
                <div className={'add-list__colors-wrapper'}>
                    {colors && colors.map((color)=>(
                        <div key={color.id} 
                            style={{background: color.hex}}
                            className={`add-list__color-lable ${activeColor === color.id ? 'add-list__color-lable_active' : ''}`}
                            onClick={() => setActiveColor(color.id)}>
                        </div>    
                    ))}
                </div>
                <input className={'add-list__submit'} 
                    style={{background: colors.filter(color => color.id === activeColor)[0].hex}}
                    type={'submit'}
                    value={isLoading ? 'Adding...' : 'Add list'}
                />
                <img className={'add-list__close'} 
                    src={CloseSvg} 
                    alt='close icon'
                    onClick={onClose}/> 
            </form>
        </div>
    );
}

export default AddListForm;