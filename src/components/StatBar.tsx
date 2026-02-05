import React from 'react';
import { Stats } from '../types';

interface StatBarProps {
    stats: Stats;
}

const StatIcon = ({ type, value }: { type: string, value: number }) => {
    let icon = '';
    let color = '';

    // Determine icon and color based on type
    switch (type) {
        case 'asset': icon = '💰'; color = 'text-yellow-500'; break;
        case 'mental': icon = '🧠'; color = 'text-blue-500'; break;
        case 'fomo': icon = '😱'; color = 'text-red-500'; break;
        case 'regulation': icon = '⚖️'; color = 'text-gray-700'; break;
    }

    // Visual feedback for fullness (simplified for now)
    const height = Math.max(10, Math.min(100, value));

    return (
        <div className="flex flex-col items-center gap-1 w-1/4">
            <div className="text-2xl">{icon}</div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${color.replace('text', 'bg')}`}
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
