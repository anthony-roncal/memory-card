/* eslint-disable no-useless-constructor */
import React from 'react';

const Card = (props) => {
    const name = props.name;
    const value = props.value;

    return (
        <div className='card' data-value={value}>
            <img src='' alt='img'/>
            <p>{name}</p>
        </div>
    );
};

export default Card;