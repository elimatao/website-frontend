import { useTranslations } from 'next-intl';
import { RoundResult } from './LedGame';
import LedGrid from './LedGrid';

interface RoundScreenProps {
    mode: string;
    currentRound: number;
    rounds: number;
    onRoundEnd: (result: RoundResult) => void;
}

export default function RoundScreen({mode, currentRound, rounds, onRoundEnd}: RoundScreenProps) {
    const t = useTranslations('LEDsGame');
    const ledCount = mode === 'hardcore' ? 10 : 6
    const numberToGuess = Math.floor(Math.random() * (2 ** ledCount));
    const startTime = Date.now();
    const penaltySeconds = mode === 'hardcore' ? 40 : 30;
    return (
      <div className="text-center p-0 py-4 md:p-6">
        <div id="currentRound" className="text-xl font-bold mb-6">
          {t('round_info', { current: currentRound, total: rounds })}
        </div>
        
        <LedGrid ledCount={ledCount} numberToRepresent={numberToGuess} />

        {/* Guess Input */}
        <form onSubmit={(e) => {
          e.preventDefault();
          const success = parseInt((e.target as any).guessedNumber.value) === numberToGuess;
          (e.target as any).guessedNumber.value = null;
          onRoundEnd({ time: success ? Date.now() - startTime : penaltySeconds * 1000, success });
        }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <label htmlFor="guessedNumber" className="font-semibold">{t('game_result')}</label>
            <input 
              id="guessedNumber" 
              name="guessedNumber" 
              type="number" 
              min="0"
              autoFocus
              className="w-24 p-2 border rounded text-center text-lg bg-background"
            />
            <button type='submit' className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded">
              {t('check')}
            </button>
          </div>
        </form>
      </div>
    )
}