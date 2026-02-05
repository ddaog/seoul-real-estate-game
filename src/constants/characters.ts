import { Character } from '../types';

export const CHARACTERS: Record<string, Character> = {
    MENTOR: {
        id: "MENTOR",
        name: "박소장",
        job: "부동산 공인중개사",
        description: "30년 경력의 베테랑. 하락장에도 수수료는 챙긴다.",
        tone: "친근하지만 속물적인. '사장님/사모님' 호칭 사용. '지금이 제일 쌀 때'라고 강조."
    },
    TRICKSTER: {
        id: "TRICKSTER",
        name: "폭락이",
        job: "유튜브 경제 렉카",
        description: "매일 썸네일에 빨간 하락 화살표를 박는 유튜버.",
        tone: "불안감을 조성하는. '일본 꼴 납니다', '지금 사면 평생 후회' 등 자극적인 화법."
    },
    GUARDIAN: {
        id: "GUARDIAN",
        name: "김대리",
        job: "은행 대출 창구 직원",
        description: "DSR 규정집을 달달 외우는 냉철한 문지기.",
        tone: "사무적이고 딱딱한. '규정상 어렵습니다', '한도가 막혔습니다' 반복."
    },
    SHADOW: {
        id: "SHADOW",
        name: "갓물주 할머니",
        job: "강남 빌딩 주인",
        description: "보따리 장사로 시작해 빌딩을 올린 입지전적인 인물.",
        tone: "돈에 매우 민감한. '월세는 제때 내야지', '젊은 사람이 노력이 부족해'."
    },
    ALLY: {
        id: "ALLY",
        name: "최대리",
        job: "입사 동기",
        description: "나보다 코인/주식/부동산 모든 걸 먼저 저지르는 팔랑귀.",
        tone: "가볍고 호들갑스러운. '야 이거 대박이래', '나 대출 땡겼어' 자랑."
    },
    SHAPESHIFTER: {
        id: "SHAPESHIFTER",
        name: "강남 엄마",
        job: "학군지 거주자",
        description: "자녀 교육을 위해서라면 영혼도 파는 맹모.",
        tone: "우아하지만 비교질하는. '어머, 거긴 학군이 좀...', '우리 애는 대치동 보내야죠'."
    }
};
