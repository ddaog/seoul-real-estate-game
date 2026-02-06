import React from 'react';
import { DETAILED_CHARACTERS } from '../constants/characters';

interface PaperAvatarProps {
    job: string;
    className?: string;
}

const PaperAvatar: React.FC<PaperAvatarProps> = ({ job, className = "" }) => {
    const character = Object.values(DETAILED_CHARACTERS).find(char => char.job === job);
    if (!character) return null;

    // Common defs for reusable filters and patterns
    const Defs = () => (
        <defs>
            <filter id="paper-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
            </filter>
            <filter id="inner-texture">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0" />
                <feComposite operator="in" in2="SourceGraphic" />
            </filter>
            <pattern id="grain-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fillOpacity="0.1" filter="url(#inner-texture)" />
            </pattern>
        </defs>
    );

    // Helper for textured shapes
    const TexturedPath = ({ d, fill, className }: { d: string, fill: string, className?: string }) => (
        <g filter="url(#paper-shadow)">
            <path d={d} fill={fill} className={className} />
            <path d={d} fill="url(#grain-pattern)" style={{ mixBlendMode: 'multiply' }} />
        </g>
    );

    const TexturedCircle = ({ cx, cy, r, fill }: { cx: number, cy: number, r: number, fill: string }) => (
        <g filter="url(#paper-shadow)">
            <circle cx={cx} cy={cy} r={r} fill={fill} />
            <circle cx={cx} cy={cy} r={r} fill="url(#grain-pattern)" style={{ mixBlendMode: 'multiply' }} />
        </g>
    );

    const renderCharacter = () => {
        switch (character.id) {
            case 'PARK_BOKDEOK': // Realtor: Blue Suit, Glasses
                return (
                    <>
                        <TexturedPath d="M40,180 A60,60 0 0,1 160,180 L160,200 L40,200 Z" fill="#2c3e50" />
                        <TexturedCircle cx={100} cy={100} r={50} fill="#f1c40f" />
                        <TexturedPath d="M60,90 L90,90 L90,110 L60,110 Z M110,90 L140,90 L140,110 L110,110 Z" fill="#34495e" />
                        <path d="M90,100 L110,100" stroke="#34495e" strokeWidth="3" />
                    </>
                );
            case 'KIM_YOUNGKKEUL': // YouTuber: Red Hoodie, Play Button
                return (
                    <>
                        <TexturedPath d="M30,200 A70,70 0 0,1 170,200 Z" fill="#e74c3c" />
                        <TexturedCircle cx={100} cy={90} r={55} fill="#ecf0f1" />
                        <TexturedPath d="M85,70 L125,90 L85,110 Z" fill="#e74c3c" />
                    </>
                );
            case 'LEE_DAECHUL': // Banker: Grey Suit, Tie
                return (
                    <>
                        <TexturedPath d="M50,200 L150,200 L150,140 A50,50 0 0,0 50,140 Z" fill="#7f8c8d" />
                        <TexturedCircle cx={100} cy={90} r={45} fill="#bdc3c7" />
                        <TexturedPath d="M95,130 L105,130 L105,180 L95,180 Z" fill="#2c3e50" />
                    </>
                );
            case 'GANGNAM_UMMA': // Mom: Purple Fan shape, Pearls
                return (
                    <>
                        <TexturedPath d="M50,200 L150,200 L120,120 L80,120 Z" fill="#8e44ad" />
                        <TexturedCircle cx={100} cy={80} r={45} fill="#e056fd" />
                        <circle cx={70} cy={130} r={8} fill="white" filter="url(#paper-shadow)" />
                        <circle cx={90} cy={140} r={8} fill="white" filter="url(#paper-shadow)" />
                        <circle cx={110} cy={140} r={8} fill="white" filter="url(#paper-shadow)" />
                        <circle cx={130} cy={130} r={8} fill="white" filter="url(#paper-shadow)" />
                    </>
                );
            case 'JEONSE_REFUGEE': // Refugee: Tilted Muted, Tear
                return (
                    <g transform="rotate(-5, 100, 100)">
                        <TexturedPath d="M40,200 Q100,120 160,200 Z" fill="#636e72" />
                        <TexturedCircle cx={100} cy={100} r={40} fill="#b2bec3" />
                        <TexturedPath d="M110,110 Q115,120 110,130 Q105,120 110,110" fill="#3498db" />
                    </g>
                );
            case 'BUILDING_HALMAE': // Landlord: Gold, Crown
                return (
                    <>
                        <TexturedPath d="M20,200 L180,200 L160,130 L40,130 Z" fill="#f39c12" />
                        <TexturedCircle cx={100} cy={90} r={50} fill="#f1c40f" />
                        <TexturedPath d="M70,50 L90,80 L110,50 L130,80 L100,20 Z" fill="#e67e22" />
                    </>
                );
            default:
                return <TexturedCircle cx={100} cy={100} r={60} fill="#95a5a6" />;
        }
    };

    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                <Defs />
                {renderCharacter()}
            </svg>
        </div>
    );
};

export default PaperAvatar;
