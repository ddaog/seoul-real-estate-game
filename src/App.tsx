import { useState, useEffect } from 'react';
import type { GameState, Card, HeroPathStage } from './types';
import { INITIAL_STATS, MAX_STAT, MIN_STAT, HERO_PATH_ORDER, STAGE_DESCRIPTIONS } from './constants';
import { generateGameCard } from './services/geminiService';
import GameCard from './components/GameCard';
import StatBar from './components/StatBar';
import { RefreshCw } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    stats: { ...INITIAL_STATS },
    currentCard: null,
    day: 1,
    stage: 'ORDINARY_WORLD',
    items: [],
    isGameOver: false
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initial Load
  useEffect(() => {
    loadNewCard();
  }, []);

  const loadNewCard = async () => {
    setIsLoading(true);
    const newCard = await generateGameCard(gameState);

    setGameState(prev => ({
      ...prev,
      currentCard: newCard as Card // Casting for now, safety needed in prod
    }));
    setIsLoading(false);
  };

  const updateStage = (day: number): HeroPathStage => {
    // Simple logic: advance stage every 10 days, maxing out at last stage
    const stageIndex = Math.min(
      Math.floor(day / 10),
      HERO_PATH_ORDER.length - 1
    );
    return HERO_PATH_ORDER[stageIndex];
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!gameState.currentCard || gameState.isGameOver) return;

    const choice = direction === 'left' ? gameState.currentCard.leftChoice : gameState.currentCard.rightChoice;
    const effect = choice.effect;

    setGameState(prev => {
      const newStats = {
        asset: Math.max(MIN_STAT, Math.min(MAX_STAT, prev.stats.asset + (effect.asset || 0))),
        mental: Math.max(MIN_STAT, Math.min(MAX_STAT, prev.stats.mental + (effect.mental || 0))),
        fomo: Math.max(MIN_STAT, Math.min(MAX_STAT, prev.stats.fomo + (effect.fomo || 0))),
        regulation: Math.max(MIN_STAT, Math.min(MAX_STAT, prev.stats.regulation + (effect.regulation || 0)))
      };

      // Check Game Over Conditions
      let isGameOver = false;
      let reason = "";

      if (newStats.asset <= 0) { isGameOver = true; reason = "파산했습니다. 서울역 노숙자가 되었습니다."; }
      if (newStats.asset >= 100) { isGameOver = true; reason = "세무조사를 받고 모든 재산을 몰수당했습니다."; }
      if (newStats.mental <= 0) { isGameOver = true; reason = "정신병원에 입원했습니다."; }
      if (newStats.mental >= 100) { isGameOver = true; reason = "현실 감각을 상실하고 사이비 종교에 빠졌습니다."; }

      const newDay = prev.day + 1;

      return {
        ...prev,
        stats: newStats,
        day: newDay,
        stage: updateStage(newDay),
        isGameOver,
        gameOverReason: reason,
        currentCard: null // Clear card to trigger loader or next card
      };
    });
  };

  // Effect to load next card after state update if not game over
  useEffect(() => {
    if (!gameState.currentCard && !gameState.isGameOver) {
      loadNewCard();
    }
  }, [gameState.currentCard, gameState.isGameOver]);

  const restartGame = () => {
    setGameState({
      stats: { ...INITIAL_STATS },
      currentCard: null,
      day: 1,
      stage: 'ORDINARY_WORLD',
      items: [],
      isGameOver: false
    });
    // Triggers loadNewCard via logic above since currentCard is null
  };

  if (gameState.isGameOver) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500">GAME OVER</h1>
        <p className="text-xl mb-2">{gameState.gameOverReason}</p>
        <p className="text-gray-400 mb-8">생존 일수: {gameState.day}일 ({gameState.stage})</p>
        <button
          onClick={restartGame}
          className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <RefreshCw size={20} />
          다시 도전하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 font-sans">
      {/* Header Info */}
      <div className="w-full max-w-sm flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tighter">SEOUL LAND LORD</h1>
          <p className="text-xs text-gray-500 font-medium">Reigns Edition</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-700">Day {gameState.day}</p>
          <p className="text-xs text-blue-600 font-semibold">{STAGE_DESCRIPTIONS[gameState.stage].split('.')[0]}</p>
        </div>
      </div>

      {/* Stats */}
      <StatBar stats={gameState.stats} />

      {/* Main Card Area */}
      <div className="flex-1 w-full flex items-center justify-center mb-8">
        {isLoading || !gameState.currentCard ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-64 h-96 bg-gray-300 rounded-xl mb-4"></div>
            <p className="text-gray-500">다음 상황을 불러오는 중...</p>
          </div>
        ) : (
          <GameCard
            card={gameState.currentCard}
            onSwipe={handleSwipe}
          />
        )}
      </div>

      {/* Footer / Debug (Optional) */}
      <div className="text-xs text-gray-400 max-w-sm text-center">
        서울 자가보유는 픽션이며 실제 지명, 인물과는 관계가 없습니다(아마도).
      </div>
    </div>
  );
}

export default App;
