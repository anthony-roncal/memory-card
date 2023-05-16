import './styles/App.css';
import Scoreboard from './components/Scoreboard';
import Card from './components/Card';
import { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [activeCards, setActiveCards] = useState([0, 1, 2]);

  const newHighScore = (newHighScore) => {
    setHighScore(newHighScore);
  }

  useEffect(() => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let newCards = [];

    const shuffleCards = () => {
      newCards.length = 0;
      while(newCards.length < 3){
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

    const handleCardClick = () => {
      incrementScore();
      shuffleCards();
    }

    document.querySelector('.shuffle').addEventListener('click', shuffleCards);
    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', handleCardClick));

    return () => {
      document.querySelector('.shuffle').removeEventListener("click", shuffleCards);
      document.querySelectorAll('.card').forEach(card => card.removeEventListener('click', handleCardClick));
    };

  }, [activeCards, score]);

  return (
    <div className="App">
      <Scoreboard score={score} highScore={highScore}/>
      <button className='shuffle' >Shuffle cards</button>
      <div className='play-area'>
        {activeCards.map(card => {
          return <Card name={card} />
        })}
      </div>
    </div>
  );
}

export default App;
