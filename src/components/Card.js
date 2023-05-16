/* eslint-disable no-useless-constructor */
import React from 'react';

const Card = (props) => {
    const name = props.name;

    return (
        <div className='card'>
            <img src='' alt='img'/>
            <p>{name}</p>
        </div>
    );
};

export default Card;