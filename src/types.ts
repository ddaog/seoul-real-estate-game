export interface Stats {
    asset: number; // 자산 (Money)
    mental: number; // 멘탈 (Mental Health)
    fomo: number; // 포모 (FOMO)
    regulation: number; // 규제 (Regulation)
}

export interface Choice {
    text: string;
    effect: Partial<Stats>;
    nextCardId?: string;
}

export interface Card {
    id: string;
    character: Character; // Who is speaking?
    image: string; // Character portrait
    text: string; // Scenario description
    leftChoice: Choice;
    rightChoice: Choice;
    type?: 'event' | 'death' | 'win';
}

export interface Character {
    id: string;
    name: string;
    job: string; // e.g. "부동산 사장님", "건물주"
    description: string;
    tone: string; // Prompting tone instructions
}

export type HeroPathStage =
    | 'ORDINARY_WORLD'
    | 'CALL_TO_ADVENTURE'
    | 'REFUSAL_OF_CALL'
    | 'MEETING_MENTOR'
    | 'CROSSING_THRESHOLD'
    | 'TESTS_ALLIES_ENEMIES'
    | 'APPROACH_INMOST_CAVE'
    | 'THE_ORDEAL'
    | 'REWARD'
    | 'THE_ROAD_BACK'
    | 'RESURRECTION'
    | 'RETURN_WITH_ELIXIR';

export interface Passive {
    id: string;
    name: string;
    description: string;
    icon: string;
    type: 'buff' | 'debuff';
    conditionDescription: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface GameState {
    stats: Stats;
    currentCard: Card | null;
    day: number;
    stage: HeroPathStage;
    items: string[]; // Deprecated, use passives
    passives: string[]; // Active passive IDs
    achievements: string[]; // Unlocked achievement IDs
    isGameOver: boolean;
    gameOverReason?: string;
}
