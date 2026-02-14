import React, { useState, useEffect } from "react";
import { WORDS } from "../WORDS";
import bgImage from "../assets/bg.jpg";
import bgImage1 from "../assets/bg1.jpg";

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
  const [showH1, setShowH1] = useState(false);
  const [showH2, setShowH2] = useState(false);
  const [showH3, setShowH3] = useState(false);
  const [showDef, setShowDef] = useState(false);

  const mistakes = MAX_ATTEMPTS - attemptsLeft;

  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

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

  function restartGame() {
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
    .map((l) => (guessedLetters.includes(l) ? l : "_"))
    .join(" ");

  const isWinner = gameWord.word.split("").every((l) => guessedLetters.includes(l));
  const isLoser = attemptsLeft === 0;

  useEffect(() => {
    if (isWinner) {
      winSound.play();
      setShowDef(true);
      setTimeout(() => {
        setShowDef(false);
        setGameWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
        setGuessedLetters([]);
        setAttemptsLeft(MAX_ATTEMPTS);
        setShowH1(false);
        setShowH2(false);
        setShowH3(false);
      }, 2500);
    }
    if (isLoser) {
      loseSound.play();
    }
  }, [isWinner, isLoser]);
return (
  <div
  style={{ 
    backgroundImage: `url(${bgImage1})`,
    minHeight: '100vh',
    backgroundAttachment: 'fixed'
  }}
  className="flex flex-col items-center justify-center
  bg-cover bg-center bg-no-repeat absolute top-0 left-0 w-full h-full
  px-4 sm:px-8 overflow-x-hidden"
>
    {/* Home Button - Top Left Corner */}
    <a
      href="https://hangman-piggypath-w94d.vercel.app/index"
      className="fixed top-4 left-4 bg-white hover:bg-gray-100 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border-2 border-gray-300 shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 z-50 flex items-center gap-2"
    >
      <span className="text-xl sm:text-2xl">🏠</span>
      <span className="text-gray-800 font-semibold text-sm sm:text-base">Home</span>
    </a>

    {/* CENTERED HANGMAN */}
    <div className="w-full flex justify-center overflow-hidden">

      {/* Hangman Drawing Area */}
      <div
        className="relative h-[220px] sm:h-[200px] md:h-[320px]
        mt-[-20px] sm:mt-0
        translate-x-[-32px] sm:translate-x-0"
      >

        {/* Base */}
        <div className="absolute bottom-3 -left-[150px] w-[300px] h-[8px] bg-black"></div>

        {/* Joint */}
        {mistakes >= 1 && (
          <div className="absolute top-[29px] -left-[2px] w-[50px] h-[6px] bg-black -rotate-45"></div>
        )}

        {/* Pole */}
        {mistakes >= 1 && (
          <div className="absolute left-0 top-[15px] w-[6px] h-[289px] bg-black"></div>
        )}

        {/* Beam */}
        {mistakes >= 2 && (
          <div className="absolute left-0 top-[10px] w-[200px] h-[6px] bg-black"></div>
        )}

        {/* Rope */}
        {mistakes >= 3 && (
          <div className="absolute left-[125px] top-[10px] w-[4px] h-[30px] bg-black"></div>
        )}

        {/* Head */}
        {mistakes >= 4 && (
          <div
            className="absolute top-[38px] left-[108px]
            w-[40px] h-[40px]
            border-6 border-black rounded-full
            flex items-center justify-center relative"
          >
            <div className="absolute left-[16px] top-[2.2px] text-xs font-bold">X</div>
            <div className="absolute right-[16px] top-[2.2px] text-xs font-bold">X</div>
            <div
              className="absolute bottom-[4px]
              w-[14px] h-[6px]
              border-t-2 border-black rounded-t-full"
            ></div>
          </div>
        )}

        {/* Body */}
        {mistakes >= 5 && (
          <div className="absolute top-[75px] left-[126px] w-[6px] h-[65px] bg-black"></div>
        )}

        {/* Left Arm */}
        {mistakes >= 6 && (
          <div className="absolute top-[92px] left-[92px] w-[40px] h-[6px] bg-black -rotate-[30deg]"></div>
        )}

        {/* Right Arm */}
        {mistakes >= 7 && (
          <div className="absolute top-[92px] left-[123px] w-[40px] h-[6px] bg-black rotate-[30deg]"></div>
        )}

        {/* Left Leg */}
        {mistakes >= 8 && (
          <div className="absolute top-[145px] left-[90px] w-[40px] h-[6px] bg-black rotate-[150deg]"></div>
        )}

        {/* Right Leg */}
        {mistakes >= 9 && (
          <div className="absolute top-[145px] left-[121px] w-[40px] h-[6px] bg-black -rotate-[135deg]"></div>
        )}

      </div>
    </div>

    {/* HINTS */}
    <div className="absolute top-10 right-6 sm:top-14 sm:right-10 flex flex-col items-end gap-3">

      <div className="flex gap-2 sm:gap-3">
        {[showH1, showH2, showH3].map((show, i) => (
          <button
            key={i}
            onClick={() => [setShowH1, setShowH2, setShowH3][i](true)}
            disabled={show}
            className={`w-8 h-8 sm:w-11 sm:h-11
            rounded-full text-sm sm:text-lg
            font-medium transition-all duration-200
            ${show
              ? "bg-emerald-100 text-emerald-600 cursor-not-allowed"
              : "bg-white hover:bg-amber-50 hover:scale-110 shadow-sm hover:shadow-md cursor-pointer border border-gray-200"
            }`}
          >
            {show ? "✓" : "💡"}
          </button>
        ))}
      </div>

      {showH1 && (
        <p className="text-sm bg-white px-3 py-2 rounded-lg shadow-md border border-gray-100 max-w-[160px] sm:max-w-[220px]">
          💡 {gameWord.hint1}
        </p>
      )}

      {showH2 && (
        <p className="text-sm bg-white px-3 py-2 rounded-lg shadow-md border border-gray-100 max-w-[160px] sm:max-w-[220px]">
          💡 {gameWord.hint2}
        </p>
      )}

      {showH3 && (
        <p className="text-sm bg-white px-3 py-2 rounded-lg shadow-md border border-gray-100 max-w-[160px] sm:max-w-[220px]">
          💡 {gameWord.hint3}
        </p>
      )}

    </div>

    {/* WORD */}
    <h2 className="tracking-[3px] sm:tracking-[8px] my-[10px] text-lg sm:text-2xl font-bold text-center break-words">
      {displayWord}
    </h2>

    {/* MESSAGES */}
    {isWinner && <p
    className="mt-3 px-5 py-2 rounded-lg
    border-2 border-yellow-500
    bg-yellow-100
    text-yellow-900 font-bold
    shadow-md"
  >🎉 You Won!</p>}

    {showDef && (
      <p className="mt-3 px-5 py-2 rounded-lg
    border-2 border-yellow-500
    bg-yellow-100
    text-yellow-900 font-bold
    shadow-md">
        <b>{gameWord.word}</b> : {gameWord.definition}
      </p>
    )}

    {isLoser && (
  <p
    className="mt-3 px-5 py-2 rounded-lg
    border-2 border-red-500
    bg-red-100
    text-red-900 font-bold
    shadow-md"
  >
    💀 You Lost! Word was <span className="uppercase">{gameWord.word}</span>
  </p>
)}


    {/* KEYBOARD */}
    <div className="mt-6 w-full max-w-[360px] sm:max-w-none">

      {keyboardRows.map(row => (
        <div key={row} className="flex justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">

          {row.split("").map(letter => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || isWinner || isLoser}
              className={`w-8 h-10 sm:w-12 sm:h-14
              rounded-lg font-bold text-sm sm:text-lg
              shadow-md transition-all border-2
              ${guessedLetters.includes(letter)
                ? gameWord.word.includes(letter)
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-red-500 text-white border-red-600"
                : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
              }
              ${(guessedLetters.includes(letter) || isWinner || isLoser)
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 cursor-pointer"}`}
            >
              {letter}
            </button>
          ))}

        </div>
      ))}

    </div>

    {/* RESTART */}
    <button
      onClick={restartGame}
      className="mt-[10px] px-6 py-2.5
      bg-gradient-to-r from-slate-800 to-slate-900
      text-white rounded-lg cursor-pointer font-semibold
      hover:from-slate-700 hover:to-slate-800
      hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
    >
       Play Again
    </button>

  </div>
);
}