'use client';

import { useTranslations } from 'next-intl';
import Script from 'next/script';
import { useState } from 'react';
import StartScreen from './StartScreen';
import RoundScreen from './RoundScreen';
import ResultScreen from './ResultScreen';

interface LedGameProps {
  featuredImage?: string;
  instructions: string; // Pass the HTML/content for instructions here
}

export type GameMode = 'normal' | 'hardcore';
export type GameState = 'start' | 'playing' | 'results';
export type RoundResult = { time: number; success: boolean; };

export default function LedGame({ featuredImage, instructions }: LedGameProps) {
  const t = useTranslations('LEDsGame');

  const [mode, setMode] = useState<GameMode>('normal');
  const [rounds, setRounds] = useState(3);
  const [gameState, setGameState] = useState<GameState>('start');
  const [results, setResults] = useState<RoundResult[]>([]);
  const [currentRound, setCurrentRound] = useState(1);

  const finishRound = (result: RoundResult) => {
    setResults([...results, result]);
    setCurrentRound(currentRound + 1); // This will only get applied in the next render.
    if (currentRound >= rounds) {
      setGameState('results');
    }
  }
  const resetGame = () => {
    setGameState('start');
    setResults([]);
    setCurrentRound(1);
  }

  return (
    <>
    { gameState === 'start' ? (
      <StartScreen instructions={instructions} mode={mode} setMode={setMode} rounds={rounds} setRounds={setRounds} setGameState={setGameState} />
    ) : gameState === 'playing' ? (
      <RoundScreen mode={mode} currentRound={currentRound} rounds={rounds} onRoundEnd={finishRound} />
    ) : (
      <ResultScreen results={results} resetGame={resetGame} />
    )}
    </>
  );
}