import React, { useState } from 'react';

const AddListForm = ({colors}) => {

    const [activeColor, setActiveColor] = useState(1);
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(title+': '+activeColor);
        setTitle('');
    }

    return(
        <div className={'add-list__form'}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className={'add-list__input'}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
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
                    value={'Add list'}
                />
            </form>
        </div>
    );
}

export default AddListForm;