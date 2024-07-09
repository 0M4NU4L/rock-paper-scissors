"use client";

import { useState } from 'react';

const choices = {
  R: 'Rock',
  P: 'Paper',
  S: 'Scissor'
};

const userAsciiArt = {
  R: `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
  `,
  P: `
     _______
---'    ____)____
           ______)
          _______)
         _______)
---.__________)
  `,
  S: `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
  `
};

const computerAsciiArt = {
  R: `
   _______
  (___    '---
 (_____)
 (_____)
  (____)
   (___)__.---
  `,
  P: `
       _______
  ____(____    '---
 (______
 (_______
  (_______
   (__________.---
  `,
  S: `
       _______
  ____(____    '---
 (______
 (__________
      (____)
       (___)__.---
  `
};

const getResult = (userChoice: keyof typeof choices, computerChoice: keyof typeof choices) => {
  if (userChoice === computerChoice) return 'Tie!';

  if (
    (userChoice === 'R' && computerChoice === 'S') ||
    (userChoice === 'P' && computerChoice === 'R') ||
    (userChoice === 'S' && computerChoice === 'P')
  ) {
    return 'You win!';
  }

  return 'You lose!';
};

const getRandomChoice = (): keyof typeof choices => {
  const keys = Object.keys(choices) as Array<keyof typeof choices>;
  return keys[Math.floor(Math.random() * keys.length)];
};

export default function Home() {
  const [userChoice, setUserChoice] = useState<keyof typeof choices | ''>('');
  const [computerChoice, setComputerChoice] = useState<keyof typeof choices | ''>('');
  const [result, setResult] = useState<string>('');

  const handleChoice = (choice: keyof typeof choices) => {
    setUserChoice(choice);
  };

  const playGame = () => {
    if (userChoice) {
      const computerChoice = getRandomChoice();
      setComputerChoice(computerChoice);
      setResult(getResult(userChoice, computerChoice));
    } else {
      alert('Please select a choice before playing!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '3em', color: '#333' }}>
        Rock Paper Scissors
      </h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleChoice('R')} style={{ marginRight: '10px', fontSize: '1.5em' }}>
          Rock
        </button>
        <button onClick={() => handleChoice('P')} style={{ marginRight: '10px', fontSize: '1.5em' }}>
          Paper
        </button>
        <button onClick={() => handleChoice('S')} style={{ marginRight: '10px', fontSize: '1.5em' }}>
          Scissor
        </button>
      </div>
      <div>
        <button onClick={playGame} style={{ marginTop: '40px', fontSize: '1.5em' }}>
          Play
        </button>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        {userChoice && (
          <div style={{ marginRight: '50px', textAlign: 'left' }}>
            <p style={{ paddingLeft: '50px', fontSize: '1.2em' }}>You</p>
            <pre>{userAsciiArt[userChoice]}</pre>
          </div>
        )}
        {computerChoice && (
          <div style={{ textAlign: 'left', marginLeft: 'auto' }}>
            <p style={{ fontSize: '1.2em' }}>Opponent</p>
            <pre>{computerAsciiArt[computerChoice]}</pre>
          </div>
        )}
      </div>
      {result && (
        <h2 style={{ marginTop: '20px', fontSize: '1.5em', color: result === 'You win!' ? 'green' : 'red' }}>
          {result}
        </h2>
      )}
    </div>
  );
}
