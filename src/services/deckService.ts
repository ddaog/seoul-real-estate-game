import type { Card, GameState, HeroPathStage } from '../types';
import { SURVIVAL_CARDS } from '../constants/survivalCards';
import { REPORTAGE_SCENARIOS } from '../constants/scenarios';

const DEFAULT_WEIGHT = 1;
const DEFAULT_COOLDOWN = 2;

const buildReportageCards = (): Card[] => {
    const cards: Card[] = [];
    (Object.keys(REPORTAGE_SCENARIOS) as HeroPathStage[]).forEach(stage => {
        const list = REPORTAGE_SCENARIOS[stage];
        list.forEach((entry, index) => {
            const leftChoice = entry.leftChoice;
            const rightChoice = entry.rightChoice;
            if (!leftChoice || !rightChoice || !entry.character || !entry.text) return;

            cards.push({
                id: `RPT-${stage}-${index}`,
                title: entry.title,
                character: entry.character,
                image: entry.image || '',
                text: entry.text,
                leftChoice: {
                    text: leftChoice.text,
                    line: leftChoice.line,
                    effects: {
                        statEffect: leftChoice.effect || {},
                        tags: []
                    }
                },
                rightChoice: {
                    text: rightChoice.text,
                    line: rightChoice.line,
                    effects: {
                        statEffect: rightChoice.effect || {},
                        tags: []
                    }
                },
                meta: {
                    weight: 1,
                    cooldown: 3,
                    stages: [stage],
                    deck: 'ambient'
                }
            });
        });
    });
    return cards;
};

const REPORTAGE_CARDS = buildReportageCards();
const ALL_CARDS: Card[] = [...SURVIVAL_CARDS, ...REPORTAGE_CARDS];

export const getCardById = (id: string): Card => {
    const found = ALL_CARDS.find(card => card.id === id);
    return found || SURVIVAL_CARDS[0];
};

const matchesStage = (card: Card, stage: HeroPathStage) => {
    if (!card.meta?.stages || card.meta.stages.length === 0) return true;
    return card.meta.stages.includes(stage);
};

const matchesStats = (card: Card, stats: GameState['stats']) => {
    if (card.meta?.minStats) {
        for (const [key, value] of Object.entries(card.meta.minStats)) {
            const statKey = key as keyof GameState['stats'];
            if (stats[statKey] < (value || 0)) return false;
        }
    }
    if (card.meta?.maxStats) {
        for (const [key, value] of Object.entries(card.meta.maxStats)) {
            const statKey = key as keyof GameState['stats'];
            if (stats[statKey] > (value || 0)) return false;
        }
    }
    return true;
};

const matchesFlags = (card: Card, flags: string[]) => {
    const flagSet = new Set(flags);
    const requiredAll = card.meta?.requiredFlagsAll || [];
    const requiredAny = card.meta?.requiredFlagsAny || [];
    const excluded = card.meta?.excludedFlags || [];

    if (requiredAll.some(flag => !flagSet.has(flag))) return false;
    if (requiredAny.length > 0 && !requiredAny.some(flag => flagSet.has(flag))) return false;
    if (excluded.some(flag => flagSet.has(flag))) return false;
    return true;
};

const matchesDeck = (card: Card, deck: string) => {
    const cardDeck = card.meta?.deck || 'main';
    return cardDeck === deck;
};

const isOnCooldown = (card: Card, recentCards: string[]) => {
    const cooldown = card.meta?.cooldown ?? DEFAULT_COOLDOWN;
    if (!cooldown || cooldown <= 0) return false;
    const recentSlice = recentCards.slice(0, cooldown);
    return recentSlice.includes(card.id);
};

const weightedPick = (cards: Card[]): Card => {
    const total = cards.reduce((sum, card) => sum + (card.meta?.weight || DEFAULT_WEIGHT), 0);
    let roll = Math.random() * total;
    for (const card of cards) {
        roll -= (card.meta?.weight || DEFAULT_WEIGHT);
        if (roll <= 0) return card;
    }
    return cards[0];
};

export const drawNextCard = (gameState: GameState): Card => {
    const activeDeck = gameState.deckLockTurns > 0 ? gameState.activeDeck : 'main';

    const filtered = ALL_CARDS.filter(card => {
        if (!matchesDeck(card, activeDeck)) return false;
        if (!matchesStage(card, gameState.stage)) return false;
        if (!matchesStats(card, gameState.stats)) return false;
        if (!matchesFlags(card, gameState.flags)) return false;
        if (isOnCooldown(card, gameState.recentCards)) return false;
        return true;
    });

    if (filtered.length > 0) {
        return weightedPick(filtered);
    }

    const fallback = ALL_CARDS.filter(card => matchesDeck(card, 'main') && matchesStage(card, gameState.stage));
    return weightedPick(fallback.length > 0 ? fallback : ALL_CARDS);
};
