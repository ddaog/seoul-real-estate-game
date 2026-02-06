import type { GameState, Stats } from '../types';
import { MIN_STAT, MAX_STAT } from '../constants';

/**
 * Calculates the final stat changes applying passive modifiers
 */
export const calculateStatChanges = (
    currentStats: Stats,
    effect: Partial<Stats>,
    activePassives: string[]
): Stats => {
    let modifiedEffect = { ...effect };

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
        if (modifiedEffect.regulation && modifiedEffect.regulation > 0) { // Regulation inc is usually bad/good? Context dependent. Assuming penalty is decrease or increase?
            // Regulation usually: High is bad (more Restrictions). So if effect adds regulation, reduce it.
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

    // 6. YOUTUBE_SLAVE: FOMO +5 extra per turn (Handled in per-turn logic or here if effect has FOMO)
    // Let's apply it if the effect has ANY fomo increase
    if (activePassives.includes('YOUTUBE_SLAVE')) {
        if (modifiedEffect.fomo && modifiedEffect.fomo > 0) {
            modifiedEffect.fomo += 5;
        }
    }

    // 7. TAX_TARGET: Asset -10 flat (Handled in turn logic usually, but here if triggered)
    // We'll leave per-turn drains for a separate logic if needed, or apply on every swipe.
    // For simplicity, let's apply small drain on every swipe if active
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

/**
 * Checks and returns new passives to be added based on game state
 */
export const checkNewPassives = (gameState: GameState): string[] => {
    const newPassives: string[] = [];
    const { stats, passives } = gameState;

    // Helper to check if not already owned
    const canAcquire = (id: string) => !passives.includes(id) && !newPassives.includes(id);

    // WEALTHY_EXPERT: Asset >= 80
    if (canAcquire('WEALTHY_EXPERT') && stats.asset >= 80) {
        newPassives.push('WEALTHY_EXPERT');
    }

    // MENTAL_TOUGHNESS: Mental <= 20
    if (canAcquire('MENTAL_TOUGHNESS') && stats.mental <= 20) {
        newPassives.push('MENTAL_TOUGHNESS');
    }

    // POLICY_MASTER: Regulation >= 80 (Simplified condition)
    if (canAcquire('POLICY_MASTER') && stats.regulation >= 80) {
        newPassives.push('POLICY_MASTER');
    }

    // FOMO_ESCAPE: FOMO >= 80 (Simplified)
    // Note: Complex history tracking (e.g. "consecutive choices") is omitted for MVP stability
    if (canAcquire('FOMO_ESCAPE') && stats.fomo >= 80) {
        // Logic: If they survived high FOMO? 
        // For now, let's give it if they have High FOMO but high Mental (managing it well)
        if (stats.mental >= 60) newPassives.push('FOMO_ESCAPE');
    }

    // DEBT_ADDICT: Asset <= 20 (Low asset = high debt roughly in this game context)
    if (canAcquire('DEBT_ADDICT') && stats.asset <= 20) {
        newPassives.push('DEBT_ADDICT');
    }

    // TAX_TARGET: Asset >= 90 (High asset = tax target)
    if (canAcquire('TAX_TARGET') && stats.asset >= 90) {
        newPassives.push('TAX_TARGET');
    }

    // YOUTUBE_SLAVE & OTHERS: Could be triggered by specific card IDs in the future

    return newPassives;
};

/**
 * Checks and returns new achievements to be unlocked
 */
export const checkNewAchievements = (gameState: GameState): string[] => {
    const newAchievements: string[] = [];
    const { stats, achievements, stage } = gameState;
    const canUnlock = (id: string) => !achievements.includes(id) && !newAchievements.includes(id);

    // FIRST_HOME: Crossing Threshold Stage or Asset check
    if (canUnlock('FIRST_HOME') && stage === 'CROSSING_THRESHOLD') {
        newAchievements.push('FIRST_HOME');
    }

    // GANGNAM_CONQUEST: High Asset + Specific Stage
    if (canUnlock('GANGNAM_CONQUEST') && stats.asset >= 90 && stage === 'REWARD') {
        newAchievements.push('GANGNAM_CONQUEST');
    }

    // POLICY_SURVIVOR: Surviving High Regulation
    if (canUnlock('POLICY_SURVIVOR') && stats.regulation >= 90 && stats.mental >= 50) {
        newAchievements.push('POLICY_SURVIVOR');
    }

    // MASTER_OF_HOLDING: Surviving Low Asset (Crash)
    if (canUnlock('MASTER_OF_HOLDING') && stats.asset <= 10 && stats.mental >= 50) {
        newAchievements.push('MASTER_OF_HOLDING');
    }

    return newAchievements;
};
