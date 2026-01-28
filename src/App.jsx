import React, { useState, useEffect } from "react";
import "./App.css";
import { WORDS } from "./WORDS";

const MAX_ATTEMPTS = 9;

const correctSound = new Audio("/sounds/corect.wav");
const wrongSound = new Audio("/sounds/wrong.wav");
const winSound = new Audio("/sounds/win.wav");
const loseSound = new Audio("/sounds/lose.wav");

export default function App() {

const [gameWord, setGameWord] = useState(
  WORDS[Math.floor(Math.random() * WORDS.length)]
);
const [guessedLetters, setGuessedLetters] = useState([]);
const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);

const [showH1,setShowH1]=useState(false);
const [showH2,setShowH2]=useState(false);
const [showH3,setShowH3]=useState(false);
const [showDef,setShowDef]=useState(false);

const mistakes = MAX_ATTEMPTS - attemptsLeft;

const keyboardRows = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
];

function handleGuess(letter) {
  if (guessedLetters.includes(letter) || isWinner || isLoser) return;

  setGuessedLetters([...guessedLetters, letter]);

  if (gameWord.word.includes(letter)) {
    correctSound.play();
  } else {
    wrongSound.play();
    setAttemptsLeft(attemptsLeft - 1);
  }
}

function restartGame(){
  setGameWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  setGuessedLetters([]);
  setAttemptsLeft(MAX_ATTEMPTS);
  setShowH1(false);
  setShowH2(false);
  setShowH3(false);
  setShowDef(false);
}

const displayWord = gameWord.word
.split("")
.map(l => guessedLetters.includes(l) ? l : "_")
.join(" ");

const isWinner = gameWord.word
.split("")
.every(l => guessedLetters.includes(l));

const isLoser = attemptsLeft === 0;
useEffect(()=>{
  if(isWinner){
    winSound.play();
    setShowDef(true);

    setTimeout(()=>{
      setShowDef(false);

      setGameWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
      setGuessedLetters([]);
      setAttemptsLeft(MAX_ATTEMPTS);

      setShowH1(false);
      setShowH2(false);
      setShowH3(false);
    },2500);
  }

  if(isLoser){
    loseSound.play();
  }
},[isWinner,isLoser]);


return (
<div className="app">

<div className="hangman-area">

  <div className="base"></div>

  {mistakes >= 1 && <div className="joint"></div>}
  {mistakes >= 1 && <div className="pole"></div>}
  {mistakes >= 2 && <div className="beam"></div>}
  {mistakes >= 3 && <div className="rope"></div>}

  {mistakes >= 4 && <div className="head"></div>}
  {mistakes >= 5 && <div className="body"></div>}
  {mistakes >= 6 && <div className="left-arm"></div>}
  {mistakes >= 7 && <div className="right-arm"></div>}
  {mistakes >= 8 && <div className="left-leg"></div>}
  {mistakes >= 9 && <div className="right-leg"></div>}

</div>

<h1 className="title">PLAY<br/>HANGMAN</h1>

<div className="hint-bar">
<button className="green" onClick={()=>setShowH1(true)}>Hint 1</button>
<button className="blue" onClick={()=>setShowH2(true)}>Hint 2</button>
<button className="red" onClick={()=>setShowH3(true)}>Hint 3</button>
</div>

{showH1 && <p>{gameWord.hint1}</p>}
{showH2 && <p>{gameWord.hint2}</p>}
{showH3 && <p>{gameWord.hint3}</p>}

<h2 className="word">{displayWord}</h2>

{showDef && (
<p>
<b>{gameWord.word}</b> : {gameWord.definition}
</p>
)}

{isLoser && <p className="lose">💀 You Lost! Word was {gameWord.word}</p>}

<div className="keyboard">
{keyboardRows.map(row => (
  <div className="row" key={row}>
    {row.split("").map(letter => (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        className={guessedLetters.includes(letter) ? "used" : ""}
        disabled={guessedLetters.includes(letter) || isWinner || isLoser}
      >
        {letter}
      </button>
    ))}
  </div>
))}
</div>

<button className="restart" onClick={restartGame}>Restart Game</button>

</div>
);
}
