import './styles/App.css';
import Scoreboard from './components/Scoreboard';
import Card from './components/Card';
import { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [numActiveCards, setNumActiveCards] = useState(3);
  const [activeCards, setActiveCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const cards = ['antelope', 'baboon', 'buffalo', 'cheetah', 'elephant', 'giraffe', 'hippo', 'horse', 'hyena', 'kangaroo', 'lion', 'llama', 'meerkat', 'oryx', 'ostrich', 'rat', 'rhino', 'warthog', 'wildebeast', 'zebra'];
    let newCards = [];

    const startGame = () => {
      setScore(0);
      shuffleCards();
      document.querySelector('.start').classList.add('hide');
    }

    const shuffleCards = () => {
      newCards.length = 0;
      while(newCards.length < numActiveCards) {
        let index = Math.floor(Math.random() * cards.length);
        let newCard = cards.slice(index, index + 1)[0];
        if(!newCards.some(card => card === newCard)) {
          newCards.push(newCard);
        }
      }
      setActiveCards(newCards);
    }

    const handleCardClick = (e) => {
      if(clickedCards.some(card => card === e.target.dataset.value)) {
        setIsGameOver(true);
      } else {
        setClickedCards([...clickedCards, e.target.dataset.value]);
        shuffleCards();
        setScore(score + 1);
        setNumActiveCards(numActiveCards + 1);
      }
    }

    document.querySelector('.start').addEventListener('click', startGame);
    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', handleCardClick));

    return () => {
      document.querySelector('.start').removeEventListener("click", startGame);
      document.querySelectorAll('.card').forEach(card => card.removeEventListener('click', handleCardClick));
    };

  }, [activeCards, score, clickedCards]);

  useEffect(() => {
    setActiveCards([]);
    if(score > highScore) {
      setHighScore(score);
    }
    setClickedCards([]);
    setNumActiveCards(3);
    setIsGameOver(false);
    document.querySelector('.start').classList.remove('hide');
  }, [isGameOver]);

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <Scoreboard score={score} highScore={highScore}/>
      <button className='start'>Start Game</button>
      <div className='play-area'>
        {activeCards.map(card => {
          return <Card name={card} key={card}/>
        })}
      </div>
    </div>
  );
}

export default App;
