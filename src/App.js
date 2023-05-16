import './styles/App.css';
import Scoreboard from './components/Scoreboard';
import Card from './components/Card';
import { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeCards, setActiveCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let newCards = [];

    const shuffleCards = () => {
      newCards.length = 0;
      while(newCards.length < 3 + score){
        let index = Math.floor(Math.random() * cards.length);
        let newCard = cards.slice(index, index + 1)[0];
        if(!newCards.some(card => card === newCard)) {
          newCards.push(newCard);
        }
      }
      setActiveCards(newCards);
    }

    const incrementScore = () => {
      setScore(score + 1);
    };

    const trackClickedCards = (e) => {
      setClickedCards([...clickedCards, e.target.dataset.value]);
    }

    const handleCardClick = (e) => {
      if(clickedCards.some(card => card === e.target.dataset.value)) {
        setIsGameOver(true);
      } else {
        trackClickedCards(e);
        shuffleCards();
        incrementScore();
      }
    }

    document.querySelector('.start').addEventListener('click', shuffleCards);
    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', handleCardClick));

    return () => {
      document.querySelector('.start').removeEventListener("click", shuffleCards);
      document.querySelectorAll('.card').forEach(card => card.removeEventListener('click', handleCardClick));
    };

  }, [activeCards, score, clickedCards]);

  useEffect(() => {
    setActiveCards([]);
    if(score > highScore)
      setHighScore(score);
    setScore(0);
    setClickedCards([]);
    setIsGameOver(false);
  }, [isGameOver]);

  return (
    <div className="App">
      <Scoreboard score={score} highScore={highScore}/>
      <button className='start'>Start Game</button>
      <div className='play-area'>
        {activeCards.map(card => {
          return <Card name={card} value={card}/>
        })}
      </div>
    </div>
  );
}

export default App;
