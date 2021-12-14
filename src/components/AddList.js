import React from 'react';

import AddSvg from '../assets/img/add.svg';

const AddList = ({toggleListAdd}) => {

    return(
        <div className={'add-list__wrapper'}>
            <button onClick={() => toggleListAdd()}
                className='bar__item  bar__item_with-img'>
                <img src={AddSvg} alt='list icon'/> 
                <span>New list</span>
            </button>
        </div>
    );
}

export default AddList;