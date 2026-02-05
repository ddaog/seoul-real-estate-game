import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { Card } from '../types';
import { DETAILED_CHARACTERS } from '../constants/characters';

interface GameCardProps {
    card: Card;
    onSwipe: (direction: 'left' | 'right') => void;
}

const GameCard: React.FC<GameCardProps> = ({ card, onSwipe }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacityLeft = useTransform(x, [-150, 0], [1, 0]);
    const opacityRight = useTransform(x, [0, 150], [0, 1]);

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    // Extract emoji from character based on their profile
    const getCharacterEmoji = (job: string): string => {
        // Match by job from DETAILED_CHARACTERS
        const character = Object.values(DETAILED_CHARACTERS).find(char => char.job === job);
        return character?.emoji || '🗣️';
    };

    return (
        <div className="relative w-full max-w-sm h-[600px] flex items-center justify-center">
            {/* Background/Deck Stack Effect */}
            <div className="absolute top-0 w-full h-full bg-gray-800 rounded-xl transform translate-x-2 translate-y-2 opacity-50"></div>

            <motion.div
                drag="x"
                dragElastic={0.7}
                style={{ x, rotate }}
                onDragEnd={handleDragEnd}
                className="relative w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-gray-200"
            >
                {/* Character Emoji Area */}
                <div className="relative h-3/5 w-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden flex items-center justify-center">
                    <div className="text-[180px] select-none opacity-90">
                        {getCharacterEmoji(card.character.job)}
                    </div>

                    {/* Swipe Overlays */}
                    <motion.div
                        style={{ opacity: opacityRight }}
                        className="absolute top-4 left-4 border-4 border-green-500 rounded-lg p-2 transform -rotate-12 z-10 bg-white/90"
                    >
                        <span className="text-2xl font-bold text-green-500 uppercase tracking-widest">
                            {card.rightChoice.text}
                        </span>
                    </motion.div>

                    <motion.div
                        style={{ opacity: opacityLeft }}
                        className="absolute top-4 right-4 border-4 border-red-500 rounded-lg p-2 transform rotate-12 z-10 bg-white/90"
                    >
                        <span className="text-2xl font-bold text-red-500 uppercase tracking-widest">
                            {card.leftChoice.text}
                        </span>
                    </motion.div>
                </div>

                {/* Text/Content Area */}
                <div className="h-2/5 p-6 flex flex-col justify-between bg-white text-gray-900">
                    <div>
                        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                            <span className="text-2xl">{getCharacterEmoji(card.character.job)}</span>
                            {card.character.name}
                            <span className="text-sm font-normal text-gray-500">({card.character.job})</span>
                        </h2>
                        <div className="w-full h-px bg-gray-200 my-2"></div>
                        <p className="text-lg leading-relaxed font-medium break-keep">
                            "{card.text}"
                        </p>
                    </div>

                    <div className="text-center text-sm text-gray-400 mt-4">
                        👈 좌우로 밀어서 선택하세요 👉
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GameCard;
