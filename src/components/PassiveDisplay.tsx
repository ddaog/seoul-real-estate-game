import React from 'react';
import { PASSIVES } from '../constants/passives';
import { motion } from 'framer-motion';

interface PassiveDisplayProps {
    activePassives: string[];
}

const PassiveDisplay: React.FC<PassiveDisplayProps> = ({ activePassives }) => {
    if (activePassives.length === 0) return null;

    return (
        <div className="fixed top-20 left-4 flex flex-col gap-2 z-10">
            {activePassives.map(id => {
                const passive = PASSIVES[id];
                if (!passive) return null;

                const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg cursor-help group relative";
                const colorClasses = passive.type === 'buff'
                    ? 'bg-blue-100 border-2 border-blue-400'
                    : 'bg-red-100 border-2 border-red-400';

                return (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${baseClasses} ${colorClasses}`}
                    >
                        {passive.icon}

                        {/* Tooltip */}
                        <div className="absolute left-full ml-2 top-0 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            <p className="font-bold mb-1">{passive.name}</p>
                            <p>{passive.description}</p>
                            <p className="text-gray-400 mt-1 italic">
                                {passive.type === 'buff' ? '유리한 효과' : '불리한 효과'}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default PassiveDisplay;
