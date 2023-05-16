/* eslint-disable no-useless-constructor */
import React from 'react';

const Scoreboard = (props) => {
    const score = props.score;
    const highScore = props.highScore;

    return (
        <div className='scoreboard'>
            <p>Current Score: {score}</p>
            <p>High Score: {highScore}</p>
        </div>
    );
};

export default Scoreboard;