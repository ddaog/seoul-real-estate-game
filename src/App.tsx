import { useState, useEffect } from 'react';
import type { GameState, Card, HeroPathStage } from './types';
import { INITIAL_STATS, HERO_PATH_ORDER, STAGE_DESCRIPTIONS } from './constants';
import { generateGameCard } from './services/geminiService';
import { calculateStatChanges, checkNewPassives, checkNewAchievements } from './services/gameLogic';
import GameCard from './components/GameCard';
import StatBar from './components/StatBar';
import PassiveDisplay from './components/PassiveDisplay';
import AchievementPanel from './components/AchievementPanel';
import { RefreshCw, Trophy } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    stats: { ...INITIAL_STATS },
    currentCard: null,
    day: 1,
    stage: 'ORDINARY_WORLD',
    passives: [],
    achievements: [],
    items: [], // Deprecated, keeping to satisfy type if needed, or better remove if type updated
    isGameOver: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

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

    setGameState(prev => {
      // 1. Calculate new stats with passive modifiers
      const newStats = calculateStatChanges(prev.stats, choice.effect, prev.passives);

      // Check Game Over Conditions
      let isGameOver = false;
      let reason = "";

      if (newStats.asset <= 0) { isGameOver = true; reason = "파산했습니다. 서울역 노숙자가 되었습니다."; }
      if (newStats.asset >= 100) { isGameOver = true; reason = "세무조사를 받고 모든 재산을 몰수당했습니다."; }
      if (newStats.mental <= 0) { isGameOver = true; reason = "정신병원에 입원했습니다."; }
      if (newStats.mental >= 100) { isGameOver = true; reason = "현실 감각을 상실하고 사이비 종교에 빠졌습니다."; }

      const newDay = prev.day + 1;
      const newStage = updateStage(newDay);

      // Temporary state for checking conditions
      const tempState = {
        ...prev,
        stats: newStats,
        day: newDay,
        stage: newStage
      };

      // 2. Check for new Passives
      const newlyAcquiredPassives = checkNewPassives(tempState);
      const finalPassives = [...prev.passives, ...newlyAcquiredPassives];

      // 3. Check for new Achievements
      const newlyUnlockedAchievements = checkNewAchievements({ ...tempState, passives: finalPassives });
      const finalAchievements = [...prev.achievements, ...newlyUnlockedAchievements];

      return {
        ...prev,
        stats: newStats,
        day: newDay,
        stage: newStage,
        passives: finalPassives,
        achievements: finalAchievements,
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
      passives: [],
      achievements: [],
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
      <div className="w-full max-w-sm flex justify-between items-end mb-4 z-10 relative">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tighter">SEOUL LAND LORD</h1>
          <p className="text-xs text-gray-500 font-medium">Reigns Edition</p>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <button
            onClick={() => setShowAchievements(true)}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-yellow-500 mb-1"
            title="도전과제"
          >
            <Trophy size={20} />
          </button>

          <div>
            <p className="text-xl font-bold text-gray-700">Day {gameState.day}</p>
            <p className="text-xs text-blue-600 font-semibold">{STAGE_DESCRIPTIONS[gameState.stage].split('.')[0]}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatBar stats={gameState.stats} />

      {/* Main Card Area */}
      <div className="flex-1 w-full flex items-center justify-center mb-8 z-0">
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

      {/* Passives & Achievements UI */}
      <PassiveDisplay activePassives={gameState.passives} />

      {showAchievements && (
        <AchievementPanel
          unlockedAchievements={gameState.achievements}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {/* Footer / Debug (Optional) */}
      <div className="text-xs text-gray-400 max-w-sm text-center">
        서울 자가보유는 픽션이며 실제 지명, 인물과는 관계가 없습니다.
      </div>
    </div>
  );
}

export default App;
