export interface SpeechPattern {
    formality: 'formal' | 'casual' | 'mixed';
    openingPhrase: string[];
    closingPhrase: string[];
    signature: string[];
    tone: string;
}

export interface CharacterProfile {
    id: string;
    name: string;
    koreanName: string;
    role: 'protagonist' | 'antagonist' | 'neutral';
    archetype: string;
    job: string;
    age: number;
    backstory: string;
    motivation: string;
    speechPattern: SpeechPattern;
    visualDescription: string;
    emoji: string;
}

export const DETAILED_CHARACTERS: Record<string, CharacterProfile> = {
    PARK_BOKDEOK: {
        id: 'PARK_BOKDEOK',
        name: '박복덕',
        koreanName: 'Park Bok-deok',
        role: 'protagonist',
        archetype: 'Mentor',
        job: '부동산 공인중개사',
        age: 62,
        backstory: '강남에서 40년을 버텨온 공인중개사. 1980년대 강남 개발 붐부터 2020년대 규제 광풍까지 모두 겪었다. 부동산으로 성공한 사람, 망한 사람 수천 명을 봤다. 이제는 돈보다 자존심으로 일한다.',
        motivation: '진짜 집이 필요한 사람에게는 도움을 주고, 투기꾼들은 골탕먹이는 것이 낙.',
        speechPattern: {
            formality: 'casual',
            openingPhrase: ['애야,', '젊은이,', '내가 봤는데,'],
            closingPhrase: ['내 말이 맞을 거야.', '두고 봐.', '후회하지 마.'],
            signature: ['40년 경력', '숫자로 이야기', '직설적'],
            tone: '냉소적이지만 정직함. 반말 사용. 구체적인 숫자와 경험담 위주.'
        },
        visualDescription: '회색 머리, 안경, 정장 차림. 강남 오피스텔 사무실 배경. 벽에 걸린 공인중개사 자격증과 부동산 시세표.',
        emoji: '🏢'
    },

    KIM_YOUNGKKEUL: {
        id: 'KIM_YOUNGKKEUL',
        name: '김영끌',
        koreanName: 'Kim Young-kkeul',
        role: 'antagonist',
        archetype: 'Trickster',
        job: '유튜브 부동산 채널 운영자',
        age: 34,
        backstory: '서울대 경제학과 출신. 대기업을 다니다 부동산 유튜브로 전업. 구독자 50만 명. 매달 광고 수익 3천만원. 실제로는 전세 2채 보유. 자극적인 썸네일과 클릭베이트의 달인.',
        motivation: '조회수가 곧 돈. FOMO를 조장해야 구독자가 늘어난다. 양심? 알고리즘 앞에선 부질없다.',
        speechPattern: {
            formality: 'formal',
            openingPhrase: ['여러분,', '구독자 여러분,', '오늘 중요한 소식이'],
            closingPhrase: ['지금이 마지막입니다.', '놓치면 평생 후회합니다.', '구독 좋아요 알림설정!'],
            signature: ['긴박감 조성', '숫자 강조', '시한부 위기감'],
            tone: '자극적이고 긴박함. 존댓말 사용. "지금 아니면", "마지막 기회" 같은 표현 남발.'
        },
        visualDescription: '깔끔한 헤어스타일, 와이셔츠. 집에 만든 유튜브 스튜디오. 뒤에 LED 조명과 "부동산의 모든 것" 네온사인. 노트북과 차트 화면.',
        emoji: '📉'
    },

    LEE_DAECHUL: {
        id: 'LEE_DAECHUL',
        name: '이대출',
        koreanName: 'Lee Dae-chul',
        role: 'neutral',
        archetype: 'Guardian',
        job: '은행 대출 창구 직원',
        age: 45,
        backstory: '국민은행 20년 차 직원. 프라이빗뱅커로 승진했지만 실상은 대출 심사가 주 업무. LTV, DTI, DSR 규정을 철저히 지킨다. 2008 금융위기 때 부실 대출 여파를 봤기에 위험을 극도로 싫어한다.',
        motivation: '은행의 리스크 관리. 규정만 지키면 누구도 책임질 일 없다. 감정보다 숫자, 사람보다 시스템.',
        speechPattern: {
            formality: 'formal',
            openingPhrase: ['죄송합니다만,', '고객님,', '규정상'],
            closingPhrase: ['양해 부탁드립니다.', '어려움을 이해합니다.', '저희도 어쩔 수 없습니다.'],
            signature: ['정중하지만 냉정', 'DSR/LTV 같은 용어', '규정 언급'],
            tone: '존댓말 사용. 정중하지만 단호함. 항상 "규정", "리스크", "심사" 같은 단어 사용.'
        },
        visualDescription: '정장, 넥타이, 단정한 외모. 은행 상담 데스크. 컴퓨터 화면에 대출 심사 프로그램. 명찰에 "PB 이대출".',
        emoji: '🏦'
    },

    GANGNAM_UMMA: {
        id: 'GANGNAM_UMMA',
        name: '강남엄마',
        koreanName: 'Kang Nam-um-ma',
        role: 'protagonist',
        archetype: 'Shapeshifter',
        job: '학군지 부동산 전문가',
        age: 42,
        backstory: '대치동에서 20년 거주. 본인도 아파트 3채 보유한 다주택자. 아들 둘을 SKY 보냈다. 학군지 부동산 가치를 누구보다 잘 안다. 겉으로는 친절하지만 속으로는 계산적.',
        motivation: '자녀 교육이 1순위. 학군지 집값이 오르면 본인 자산도 오른다. 초보자를 도와주는 척 하면서 자기 집 시세를 올린다.',
        speechPattern: {
            formality: 'mixed',
            openingPhrase: ['여기요?', '이 동네는요,', '우리 애들 학교'],
            closingPhrase: ['그래서 비싼 거예요.', '학군 값이죠.', '알 사람은 다 알아요.'],
            signature: ['존댓말/반말 혼용', '학군 강조', '이중적 태도'],
            tone: '상황에 따라 존댓말/반말 전환. 학군, 교육, 아이들 이야기 자주 언급. 때론 친절, 때론 배타적.'
        },
        visualDescription: '명품 가방, 깔끔한 화장, 운동복 차림. 대치동 카페. 테이블에 스타벅스 커피와 아이패드. 배경에 학원가 간판.',
        emoji: '👩‍👧'
    },

    JEONSE_REFUGEE: {
        id: 'JEONSE_REFUGEE',
        name: '전세난민 동기',
        koreanName: 'Jeonse Refugee',
        role: 'protagonist',
        archetype: 'Ally',
        job: '입사 동기',
        age: 32,
        backstory: '같은 해 입사한 동기. 작년에 전세사기를 당해 보증금 2억을 날렸다. 현재 부모님 집에 얹혀살며 재기를 꿈꾼다. 부러움과 질투, 위로와 응원이 공존하는 복잡한 감정.',
        motivation: '다시 일어서야 한다. 친구가 성공하는 건 기쁘지만 동시에 아프다. 솔직한 현실 조언자.',
        speechPattern: {
            formality: 'casual',
            openingPhrase: ['야,', '너 진짜', '솔직히'],
            closingPhrase: ['부럽다.', '잘됐네.', '조심해.'],
            signature: ['반말', '솔직함', '현실적 조언'],
            tone: '반말 사용. 직설적이고 솔직함. 때로는 부러움, 때로는 경고, 때로는 축하.'
        },
        visualDescription: '캐주얼 복장, 피곤한 표정. 회사 카페테리아 또는 술집. 테이블에 커피잔이나 소주잔.',
        emoji: '🤝'
    },

    BUILDING_HALMAE: {
        id: 'BUILDING_HALMAE',
        name: '빌딩할매',
        koreanName: 'Building Hal-mae',
        role: 'antagonist',
        archetype: 'Shadow',
        job: '강남 빌딩주',
        age: 68,
        backstory: '강남 빌딩 3채 소유. 월 임대수익 5천만원. 1970년대 강남 땅을 헐값에 사서 40년 보유. 냉혹한 자본주의의 승리자. 세입자의 사정 따위 관심 없다.',
        motivation: '돈이 곧 권력. 월세는 제때 받아야 하고, 시세가 오르면 당연히 올려야 한다. 감정은 사치.',
        speechPattern: {
            formality: 'mixed',
            openingPhrase: ['월세?', '젊은 사람,', '요즘 애들은'],
            closingPhrase: ['당연한 거 아냐?', '시세가 그래.', '싫으면 나가면 돼.'],
            signature: ['권력자의 어투', '단호함', '무감정'],
            tone: '높임말도 반말도 아닌 권력자의 어투. 감정 없이 차갑게. 돈 이야기를 거침없이.'
        },
        visualDescription: '고급 한복 또는 명품 코트. 강남 타워팰리스 거실. 커다란 창밖으로 한강 뷰. 소파에 앉아 차 마시는 모습.',
        emoji: '👵'
    }
};

// Legacy compatibility - map to old structure
export const CHARACTERS = {
    MENTOR: {
        id: 'MENTOR',
        name: DETAILED_CHARACTERS.PARK_BOKDEOK.name,
        job: DETAILED_CHARACTERS.PARK_BOKDEOK.job,
        description: DETAILED_CHARACTERS.PARK_BOKDEOK.backstory,
        tone: DETAILED_CHARACTERS.PARK_BOKDEOK.speechPattern.tone
    },
    TRICKSTER: {
        id: 'TRICKSTER',
        name: DETAILED_CHARACTERS.KIM_YOUNGKKEUL.name,
        job: DETAILED_CHARACTERS.KIM_YOUNGKKEUL.job,
        description: DETAILED_CHARACTERS.KIM_YOUNGKKEUL.backstory,
        tone: DETAILED_CHARACTERS.KIM_YOUNGKKEUL.speechPattern.tone
    },
    GUARDIAN: {
        id: 'GUARDIAN',
        name: DETAILED_CHARACTERS.LEE_DAECHUL.name,
        job: DETAILED_CHARACTERS.LEE_DAECHUL.job,
        description: DETAILED_CHARACTERS.LEE_DAECHUL.backstory,
        tone: DETAILED_CHARACTERS.LEE_DAECHUL.speechPattern.tone
    },
    SHADOW: {
        id: 'SHADOW',
        name: DETAILED_CHARACTERS.BUILDING_HALMAE.name,
        job: DETAILED_CHARACTERS.BUILDING_HALMAE.job,
        description: DETAILED_CHARACTERS.BUILDING_HALMAE.backstory,
        tone: DETAILED_CHARACTERS.BUILDING_HALMAE.speechPattern.tone
    },
    ALLY: {
        id: 'ALLY',
        name: DETAILED_CHARACTERS.JEONSE_REFUGEE.name,
        job: DETAILED_CHARACTERS.JEONSE_REFUGEE.job,
        description: DETAILED_CHARACTERS.JEONSE_REFUGEE.backstory,
        tone: DETAILED_CHARACTERS.JEONSE_REFUGEE.speechPattern.tone
    },
    SHAPESHIFTER: {
        id: 'SHAPESHIFTER',
        name: DETAILED_CHARACTERS.GANGNAM_UMMA.name,
        job: DETAILED_CHARACTERS.GANGNAM_UMMA.job,
        description: DETAILED_CHARACTERS.GANGNAM_UMMA.backstory,
        tone: DETAILED_CHARACTERS.GANGNAM_UMMA.speechPattern.tone
    }
};
