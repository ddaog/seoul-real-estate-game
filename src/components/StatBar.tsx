import React from 'react';
import type { Stats } from '../types';

interface StatBarProps {
    stats: Stats;
}

const StatIcon = ({ type, value }: { type: string, value: number }) => {
    const config: Record<string, { icon: string, color: string, bgColor: string }> = {
        asset: { icon: '💰', color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
        mental: { icon: '🧠', color: 'text-blue-500', bgColor: 'bg-blue-500' },
        fomo: { icon: '😱', color: 'text-red-500', bgColor: 'bg-red-500' },
        regulation: { icon: '⚖️', color: 'text-gray-700', bgColor: 'bg-gray-700' }
    };

    const { icon, bgColor } = config[type] || { icon: '❓', color: 'text-gray-400', bgColor: 'bg-gray-400' };

    // Visual feedback for fullness (simplified for now)
    const height = Math.max(10, Math.min(100, value));

    return (
        <div className="flex flex-col items-center gap-1 w-1/4">
            <div className="text-2xl">{icon}</div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${bgColor}`}
                    style={{ width: `${height}%` }}
                ></div>
            </div>
        </div>
    );
};

const StatBar: React.FC<StatBarProps> = ({ stats }) => {
    return (
        <div className="flex justify-between items-center w-full max-w-sm bg-white p-4 rounded-xl shadow-md mb-4 gap-4">
            <StatIcon type="asset" value={stats.asset} />
            <StatIcon type="mental" value={stats.mental} />
            <StatIcon type="fomo" value={stats.fomo} />
            <StatIcon type="regulation" value={stats.regulation} />
        </div>
    );
};

export default StatBar;
