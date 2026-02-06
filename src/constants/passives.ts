import type { Passive } from '../types';

export const PASSIVES: Record<string, Passive> = {
    WEALTHY_EXPERT: {
        id: 'WEALTHY_EXPERT',
        name: '재테크 고수',
        description: '돈이 돈을 번다는 진리를 깨달았다',
        icon: '💰',
        type: 'buff',
        conditionDescription: 'Asset 80 이상 5회 유지'
    },
    MENTAL_TOUGHNESS: {
        id: 'MENTAL_TOUGHNESS',
        name: '멘탈갑',
        description: '이 정도 스트레스는 껌이지',
        icon: '🧠',
        type: 'buff',
        conditionDescription: 'Mental 20 이하에서 생존'
    },
    POLICY_MASTER: {
        id: 'POLICY_MASTER',
        name: '정책통',
        description: '부동산 정책은 내가 더 잘 알아',
        icon: '📜',
        type: 'buff',
        conditionDescription: 'Regulation 관련 선택 20회'
    },
    FOMO_ESCAPE: {
        id: 'FOMO_ESCAPE',
        name: 'FOMO 탈출',
        description: '남이 사든 말든, 내 길을 간다',
        icon: '😌',
        type: 'buff',
        conditionDescription: 'FOMO 80 이상일 때 참는다 선택 3회'
    },
    DEBT_ADDICT: {
        id: 'DEBT_ADDICT',
        name: '영끌 중독',
        description: '대출 없인 못 살아...',
        icon: '🏦',
        type: 'debuff',
        conditionDescription: '대출 관련 선택 10회 연속'
    },
    YOUTUBE_SLAVE: {
        id: 'YOUTUBE_SLAVE',
        name: '유튜브 알고리즘 노예',
        description: '지금이 마지막! 지금이 마지막!',
        icon: '📱',
        type: 'debuff',
        conditionDescription: '김영끌의 조언을 5회 따름'
    },
    TAX_TARGET: {
        id: 'TAX_TARGET',
        name: '종부세 타겟',
        description: '국세청이 주목하고 있습니다',
        icon: '💸',
        type: 'debuff',
        conditionDescription: '3주택 이상 보유'
    }
};
