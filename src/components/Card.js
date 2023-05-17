/* eslint-disable no-useless-constructor */
import React from 'react';

const Card = (props) => {
    const name = props.name;

    return (
        <div className='card' data-value={name}>
            <img src={require(`../images/${name}.png`)} alt={`${name}`} data-value={name}/>
        </div>
    );
};

export default Card;