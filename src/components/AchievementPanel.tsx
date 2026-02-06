import React from 'react';
import { ACHIEVEMENTS } from '../constants/achievements';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface AchievementPanelProps {
    unlockedAchievements: string[];
    onClose: () => void;
}

const AchievementPanel: React.FC<AchievementPanelProps> = ({ unlockedAchievements, onClose }) => {
    const allAchievements = Object.values(ACHIEVEMENTS);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Trophy className="text-yellow-500" />
                        도전과제 ({unlockedAchievements.length}/{allAchievements.length})
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>

                <div className="p-4 overflow-y-auto space-y-3">
                    {allAchievements.map(achievement => {
                        const isUnlocked = unlockedAchievements.includes(achievement.id);

                        return (
                            <div
                                key={achievement.id}
                                className={`flex items-center gap-4 p-3 rounded-lg border ${isUnlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-100 border-gray-200 opacity-60'
                                    }`}
                            >
                                <div className={`text-2xl ${!isUnlocked && 'grayscale'}`}>
                                    {achievement.icon}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                                        {achievement.name}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        {achievement.description}
                                    </p>
                                </div>
                                {isUnlocked && (
                                    <div className="ml-auto text-xs font-bold text-yellow-600">완료</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default AchievementPanel;
