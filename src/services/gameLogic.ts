import type { Choice, ChoiceEffect, GameState, Stats } from '../types';
import { MIN_STAT, MAX_STAT } from '../constants';

const COUNTER_KEYS = {
    asset80Streak: 'asset80Streak',
    mentalLowSurvived: 'mentalLowSurvived',
    regulationChoiceCount: 'regulationChoiceCount',
    fomoResistCount: 'fomoResistCount',
    debtChoiceStreak: 'debtChoiceStreak',
    youngkkeulFollowCount: 'youngkkeulFollowCount',
    youngkkeulRejectCount: 'youngkkeulRejectCount',
    crashHoldCount: 'crashHoldCount',
    regulationEndureCount: 'regulationEndureCount'
} as const;

const getCounter = (counters: Record<string, number>, key: string) => counters[key] || 0;

/**
 * Normalize legacy and current choice effect shapes.
 */
export const normalizeChoiceEffect = (choice: Choice): ChoiceEffect => {
    const legacyNext = (choice.effects as ChoiceEffect & { next?: string })?.next;
    return {
        ...choice.effects,
        statEffect: choice.effects?.statEffect || choice.effect || {},
        nextCardId: choice.effects?.nextCardId || choice.nextCardId || legacyNext,
        addFlags: choice.effects?.addFlags || [],
        removeFlags: choice.effects?.removeFlags || [],
        setFlags: choice.effects?.setFlags || undefined,
        tags: choice.effects?.tags || []
    };
};

/**
 * Calculates the final stat changes applying passive modifiers
 */
export const calculateStatChanges = (
    currentStats: Stats,
    effect: Partial<Stats>,
    activePassives: string[]
): Stats => {
    const modifiedEffect = { ...effect };

    // 1. WEALTHY_EXPERT: Asset increase +20%
    if (activePassives.includes('WEALTHY_EXPERT')) {
        if (modifiedEffect.asset && modifiedEffect.asset > 0) {
            modifiedEffect.asset = Math.round(modifiedEffect.asset * 1.2);
        }
    }

    // 2. MENTAL_TOUGHNESS: Mental decrease -30% (less damage)
    if (activePassives.includes('MENTAL_TOUGHNESS')) {
        if (modifiedEffect.mental && modifiedEffect.mental < 0) {
            modifiedEffect.mental = Math.round(modifiedEffect.mental * 0.7);
        }
    }

    // 3. POLICY_MASTER: Regulation penalties -50%
    if (activePassives.includes('POLICY_MASTER')) {
        if (modifiedEffect.regulation && modifiedEffect.regulation > 0) {
            modifiedEffect.regulation = Math.round(modifiedEffect.regulation * 0.5);
        }
    }

    // 4. FOMO_ESCAPE: FOMO increase -40%
    if (activePassives.includes('FOMO_ESCAPE')) {
        if (modifiedEffect.fomo && modifiedEffect.fomo > 0) {
            modifiedEffect.fomo = Math.round(modifiedEffect.fomo * 0.6);
        }
    }

    // 5. DEBT_ADDICT: Asset decrease +30% (more debt impact)
    if (activePassives.includes('DEBT_ADDICT')) {
        if (modifiedEffect.asset && modifiedEffect.asset < 0) {
            modifiedEffect.asset = Math.round(modifiedEffect.asset * 1.3);
        }
    }

    // 6. YOUTUBE_SLAVE: FOMO +5 extra per turn
    if (activePassives.includes('YOUTUBE_SLAVE')) {
        if (modifiedEffect.fomo && modifiedEffect.fomo > 0) {
            modifiedEffect.fomo += 5;
        }
    }

    // 7. TAX_TARGET: Asset -2 flat per swipe
    if (activePassives.includes('TAX_TARGET')) {
        modifiedEffect.asset = (modifiedEffect.asset || 0) - 2;
    }

    return {
        asset: Math.max(MIN_STAT, Math.min(MAX_STAT, currentStats.asset + (modifiedEffect.asset || 0))),
        mental: Math.max(MIN_STAT, Math.min(MAX_STAT, currentStats.mental + (modifiedEffect.mental || 0))),
        fomo: Math.max(MIN_STAT, Math.min(MAX_STAT, currentStats.fomo + (modifiedEffect.fomo || 0))),
        regulation: Math.max(MIN_STAT, Math.min(MAX_STAT, currentStats.regulation + (modifiedEffect.regulation || 0)))
    };
};

export const applyChoiceSideEffects = (
    gameState: GameState,
    effect: ChoiceEffect,
    nextStats: Stats
) => {
    const nextFlags = new Set(gameState.flags);

    if (effect.setFlags && effect.setFlags.length > 0) {
        nextFlags.clear();
        effect.setFlags.forEach(flag => nextFlags.add(flag));
    }
    (effect.addFlags || []).forEach(flag => nextFlags.add(flag));
    (effect.removeFlags || []).forEach(flag => nextFlags.delete(flag));

    const nextCounters: Record<string, number> = { ...gameState.counters };

    if (effect.statEffect?.regulation !== undefined) {
        nextCounters[COUNTER_KEYS.regulationChoiceCount] = getCounter(nextCounters, COUNTER_KEYS.regulationChoiceCount) + 1;
    }

    const tags = effect.tags || [];

    if (tags.includes('fomo_resist') && nextStats.fomo >= 80) {
        nextCounters[COUNTER_KEYS.fomoResistCount] = getCounter(nextCounters, COUNTER_KEYS.fomoResistCount) + 1;
    }

    if (tags.includes('debt')) {
        nextCounters[COUNTER_KEYS.debtChoiceStreak] = getCounter(nextCounters, COUNTER_KEYS.debtChoiceStreak) + 1;
    } else {
        nextCounters[COUNTER_KEYS.debtChoiceStreak] = 0;
    }

    if (tags.includes('youngkkeul_follow')) {
        nextCounters[COUNTER_KEYS.youngkkeulFollowCount] = getCounter(nextCounters, COUNTER_KEYS.youngkkeulFollowCount) + 1;
    }

    if (tags.includes('youngkkeul_reject')) {
        nextCounters[COUNTER_KEYS.youngkkeulRejectCount] = getCounter(nextCounters, COUNTER_KEYS.youngkkeulRejectCount) + 1;
    }

    if (tags.includes('crash_hold')) {
        nextCounters[COUNTER_KEYS.crashHoldCount] = getCounter(nextCounters, COUNTER_KEYS.crashHoldCount) + 1;
    }

    if (tags.includes('regulation_endure')) {
        nextCounters[COUNTER_KEYS.regulationEndureCount] = getCounter(nextCounters, COUNTER_KEYS.regulationEndureCount) + 1;
    }

    if (nextStats.asset >= 80) {
        nextCounters[COUNTER_KEYS.asset80Streak] = getCounter(nextCounters, COUNTER_KEYS.asset80Streak) + 1;
    } else {
        nextCounters[COUNTER_KEYS.asset80Streak] = 0;
    }

    if (nextStats.mental <= 20) {
        nextCounters[COUNTER_KEYS.mentalLowSurvived] = 1;
    }

    const nextPropertyCount = Math.max(0, gameState.propertyCount + (effect.addProperties || 0));

    return {
        flags: Array.from(nextFlags),
        counters: nextCounters,
        propertyCount: nextPropertyCount,
        nextCardId: effect.nextCardId,
        activeDeck: effect.setDeck || gameState.activeDeck,
        deckLockTurns: effect.setDeck ? (effect.deckLockTurns || 2) : gameState.deckLockTurns
    };
};

/**
 * Checks and returns new passives to be added based on game state
 */
export const checkNewPassives = (gameState: GameState): string[] => {
    const newPassives: string[] = [];
    const { passives, counters, propertyCount } = gameState;

    const canAcquire = (id: string) => !passives.includes(id) && !newPassives.includes(id);

    if (canAcquire('WEALTHY_EXPERT') && getCounter(counters, COUNTER_KEYS.asset80Streak) >= 5) {
        newPassives.push('WEALTHY_EXPERT');
    }

    if (canAcquire('MENTAL_TOUGHNESS') && getCounter(counters, COUNTER_KEYS.mentalLowSurvived) >= 1) {
        newPassives.push('MENTAL_TOUGHNESS');
    }

    if (canAcquire('POLICY_MASTER') && getCounter(counters, COUNTER_KEYS.regulationChoiceCount) >= 20) {
        newPassives.push('POLICY_MASTER');
    }

    if (canAcquire('FOMO_ESCAPE') && getCounter(counters, COUNTER_KEYS.fomoResistCount) >= 3) {
        newPassives.push('FOMO_ESCAPE');
    }

    if (canAcquire('DEBT_ADDICT') && getCounter(counters, COUNTER_KEYS.debtChoiceStreak) >= 10) {
        newPassives.push('DEBT_ADDICT');
    }

    if (canAcquire('YOUTUBE_SLAVE') && getCounter(counters, COUNTER_KEYS.youngkkeulFollowCount) >= 5) {
        newPassives.push('YOUTUBE_SLAVE');
    }

    if (canAcquire('TAX_TARGET') && propertyCount >= 3) {
        newPassives.push('TAX_TARGET');
    }

    return newPassives;
};

/**
 * Checks and returns new achievements to be unlocked
 */
export const checkNewAchievements = (gameState: GameState): string[] => {
    const newAchievements: string[] = [];
    const { stats, achievements, flags, counters, propertyCount } = gameState;
    const canUnlock = (id: string) => !achievements.includes(id) && !newAchievements.includes(id);

    if (canUnlock('FIRST_HOME') && propertyCount >= 1) {
        newAchievements.push('FIRST_HOME');
    }

    if (canUnlock('GANGNAM_CONQUEST') && flags.includes('OWN_GANGNAM')) {
        newAchievements.push('GANGNAM_CONQUEST');
    }

    if (canUnlock('BUILDING_KING') && flags.includes('OWN_COMMERCIAL')) {
        newAchievements.push('BUILDING_KING');
    }

    if (canUnlock('MASTER_OF_HOLDING') && getCounter(counters, COUNTER_KEYS.crashHoldCount) >= 5) {
        newAchievements.push('MASTER_OF_HOLDING');
    }

    if (canUnlock('POLICY_SURVIVOR') && getCounter(counters, COUNTER_KEYS.regulationEndureCount) >= 3) {
        newAchievements.push('POLICY_SURVIVOR');
    }

    if (canUnlock('FOMO_CONQUEROR') && flags.includes('GAME_CLEAR') && stats.fomo >= 90) {
        newAchievements.push('FOMO_CONQUEROR');
    }

    if (canUnlock('DISCIPLE_OF_BOKDEOK')
        && flags.includes('BOKDEOK_1')
        && flags.includes('BOKDEOK_2')
        && flags.includes('BOKDEOK_3')
    ) {
        newAchievements.push('DISCIPLE_OF_BOKDEOK');
    }

    if (canUnlock('UNSUBSCRIBE_YOUNGKKEUL') && getCounter(counters, COUNTER_KEYS.youngkkeulRejectCount) >= 10) {
        newAchievements.push('UNSUBSCRIBE_YOUNGKKEUL');
    }

    return newAchievements;
};
