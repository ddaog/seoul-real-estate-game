import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { Card } from '../types';
import PaperAvatar from './PaperAvatar';

interface GameCardProps {
    card: Card;
    onSwipe: (direction: 'left' | 'right') => void;
}

const GameCard: React.FC<GameCardProps> = ({ card, onSwipe }) => {
    // Motion values for drag gesture
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    // Opacity for swipe hints (Like/Dislike overlays)
    const opacityLeft = useTransform(x, [0, 100], [0, 1]);
    const opacityRight = useTransform(x, [-100, 0], [1, 0]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x < -100) {
            onSwipe('left');
        } else if (info.offset.x > 100) {
            onSwipe('right');
        }
    };

    return (
        <div className="relative w-full max-w-sm h-[600px] flex items-center justify-center perspective-1000">
            {/* Background/Deck Stack Effect */}
            <div className="absolute top-0 w-80 h-[500px] bg-gray-200 rounded-xl transform translate-x-2 translate-y-2 opacity-50 border border-gray-300"></div>

            <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="absolute w-80 h-[500px] cursor-grab active:cursor-grabbing perspective-1000"
            >
                <div className="w-full h-full paper-card rounded-xl overflow-hidden flex flex-col relative folded-corner bg-[#faf9f6]">
                    {/* Visual Header - Paper Texture Background */}
                    <div className="relative h-3/5 w-full bg-[#f0f0f0] overflow-hidden flex items-center justify-center paper-texture border-b border-gray-200">

                        {/* Geometric Paper Avatar */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                            <PaperAvatar job={card.character.job} className="w-56 h-56" />
                        </div>

                        {/* Hint Overlay (Left/Right) */}
                        <motion.div
                            style={{ opacity: opacityLeft }}
                            className="absolute inset-0 bg-blue-500/10 flex items-center justify-center pointer-events-none z-10"
                        >
                            <div className="bg-white/90 px-6 py-3 rounded-lg shadow-xl transform roate-12 border-2 border-blue-500 text-blue-600 font-bold text-xl -rotate-12">
                                {card.rightChoice.text}
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ opacity: opacityRight }}
                            className="absolute inset-0 bg-red-500/10 flex items-center justify-center pointer-events-none z-10"
                        >
                            <div className="bg-white/90 px-6 py-3 rounded-lg shadow-xl transform rotate-12 border-2 border-red-500 text-red-600 font-bold text-xl">
                                {card.leftChoice.text}
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Area */}
                    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-[#faf9f6] paper-texture relative z-20">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 border-b-2 border-gray-200 pb-1 w-full">
                            {card.character.name}
                            <span className="text-xs font-normal text-gray-500 ml-2 block sm:inline">
                                {card.character.job}
                            </span>
                        </h3>
                        <p className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                            {card.text}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GameCard;
