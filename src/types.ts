export interface Stats {
    asset: number; // 자산 (Money)
    mental: number; // 멘탈 (Mental Health)
    fomo: number; // 포모 (FOMO)
    regulation: number; // 규제 (Regulation)
}

export interface ChoiceEffect {
    statEffect?: Partial<Stats>; // Optional stat changes
    setFlags?: string[]; // Replace all flags with this set
    addFlags?: string[]; // Add to existing flags
    removeFlags?: string[]; // Remove from existing flags
    requiresFlagsAny?: string[]; // Conditional: player must have at least one of these
    nextCardId?: string; // Next card ID
    setDeck?: string; // Activate a sub-deck
    deckLockTurns?: number; // Lock sub-deck for N turns
    addProperties?: number; // +/- property count
    tags?: string[]; // Choice tags for counters/achievements
}

export interface Choice {
    text: string;
    line?: string; // Character's spoken response
    effects: ChoiceEffect;
    // Legacy support
    effect?: Partial<Stats>;
    nextCardId?: string;
}

export interface CardVariant {
    description: string;
    weight?: number; // Probability weight (default: 1)
}

export interface Card {
    id: string;
    title?: string; // Card title (e.g., "월급날: 잠깐 스쳐가는 돈")
    character: Character; // Who is speaking?
    image: string; // Character portrait
    text: string; // Scenario description
    variants?: CardVariant[]; // Alternative descriptions for replayability
    leftChoice: Choice;
    rightChoice: Choice;
    type?: 'event' | 'death' | 'win' | 'ending';
    meta?: CardMeta;
}

export interface Character {
    id: string;
    name: string;
    job: string; // e.g. "부동산 사장님", "건물주"
    description: string;
    tone: string; // Prompting tone instructions
}

export interface CardMeta {
    weight?: number; // Draw weight
    cooldown?: number; // Turns before reappearing
    stages?: HeroPathStage[]; // Allowed stages
    minStats?: Partial<Stats>;
    maxStats?: Partial<Stats>;
    requiredFlagsAll?: string[];
    requiredFlagsAny?: string[];
    excludedFlags?: string[];
    deck?: string; // e.g. "main", "youngkkeul"
    tags?: string[]; // Card tags
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
    flags: string[]; // Narrative branching flags
    counters: Record<string, number>; // Progress counters
    propertyCount: number; // Owned properties
    recentCards: string[]; // Recent card ids for cooldown
    activeDeck: string; // Current deck lock
    deckLockTurns: number; // Remaining lock turns
    nextCardId?: string; // Forced next card
    isGameOver: boolean;
    gameOverReason?: string;
}
