import type { Achievement } from '../types';

export const ACHIEVEMENTS: Record<string, Achievement> = {
    FIRST_HOME: {
        id: 'FIRST_HOME',
        name: '첫 집',
        description: '첫 계약 완료',
        icon: '🏠'
    },
    GANGNAM_CONQUEST: {
        id: 'GANGNAM_CONQUEST',
        name: '강남 정복',
        description: '강남 3구 아파트 구매',
        icon: '🏙️'
    },
    BUILDING_KING: {
        id: 'BUILDING_KING',
        name: '빌딩킹',
        description: '상업용 건물 구매',
        icon: '👑'
    },
    MASTER_OF_HOLDING: {
        id: 'MASTER_OF_HOLDING',
        name: '존버의 달인',
        description: '집값 폭락 시 참기 선택 5회',
        icon: '💎'
    },
    POLICY_SURVIVOR: {
        id: 'POLICY_SURVIVOR',
        name: '정책 서바이버',
        description: '정부 규제 3회 이상 견딤',
        icon: '🛡️'
    },
    FOMO_CONQUEROR: {
        id: 'FOMO_CONQUEROR',
        name: 'FOMO 극복자',
        description: 'FOMO 90 이상에서 게임 클리어',
        icon: '🧘'
    },
    DISCIPLE_OF_BOKDEOK: {
        id: 'DISCIPLE_OF_BOKDEOK',
        name: '박복덕의 제자',
        description: '박복덕 이벤트 모두 완료',
        icon: '📜'
    },
    UNSUBSCRIBE_YOUNGKKEUL: {
        id: 'UNSUBSCRIBE_YOUNGKKEUL',
        name: '김영끌 구독 취소',
        description: '김영끌 조언 10회 거절',
        icon: '📵'
    }
};
