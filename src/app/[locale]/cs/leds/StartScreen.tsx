import { useTranslations } from 'next-intl';
import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { GameMode, GameState } from './LedGame';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { mdxComponents } from '@/mdx-components';

interface StartScreenProps {
  instructions: React.ReactNode;
  mode: GameMode;
  setMode: Dispatch<SetStateAction<GameMode>>;
  rounds: number;
  setRounds: Dispatch<SetStateAction<number>>;
  setGameState: Dispatch<SetStateAction<GameState>>;
}
export default function StartScreen({ instructions, mode, setMode, rounds, setRounds, setGameState }: StartScreenProps) {
    const t = useTranslations('LEDsGame');
    return (
      <div id="StartCont" className="container mx-auto p-6 bg-card">
        
        {/* Game Config Form */}
        <div className="p-4 mb-6 bg-accent/10 rounded-lg text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-left">

            {/* Round Count */}
            <label htmlFor="rounds" className="font-semibold">{t('round_count')}</label>
            <input 
              id="rounds" 
              name="rounds" 
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              type="number" 
              min="1" 
              max="10"
              className="w-full p-2 border rounded bg-background text-foreground"
            />

            {/* Game Mode */}
            <label htmlFor="mode" className="font-semibold">{t('game_mode')}</label>
            <select 
              title='led_mode'
              id="LEDMode" 
              name="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as GameMode)}
              className="w-full p-2 border rounded bg-background text-foreground"
            >
              <option value="normal">Normal</option>
              <option value="hardcore">Hardcore</option>
            </select>
          </div>

          <Button
            type='submit'
            className="mt-6 w-full sm:w-auto px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors"
            onClick={() => setGameState('playing')}
          >
            {t('play')}
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-left prose dark:prose-invert max-w-none">
          <h5 className="text-xl font-bold mb-2">{t('instructions')}</h5>
          <div className="text-muted-foreground">
            {instructions}
          </div>
        </div>
      </div>
    )
}