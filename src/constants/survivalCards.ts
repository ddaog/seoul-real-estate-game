import type { Card, Character } from '../types';
import { DETAILED_CHARACTERS } from './characters';

const toCharacter = (profile: typeof DETAILED_CHARACTERS[keyof typeof DETAILED_CHARACTERS]): Character => ({
    id: profile.id,
    name: profile.name,
    job: profile.job,
    description: profile.backstory,
    tone: profile.speechPattern.tone
});

const NARRATOR = toCharacter(DETAILED_CHARACTERS.PARK_BOKDEOK);
const YOUNGKKEUL = toCharacter(DETAILED_CHARACTERS.KIM_YOUNGKKEUL);
const LOAN_OFFICER = toCharacter(DETAILED_CHARACTERS.LEE_DAECHUL);
const GANGNAM_UMMA = toCharacter(DETAILED_CHARACTERS.GANGNAM_UMMA);
const JEONSE_REFUGEE = toCharacter(DETAILED_CHARACTERS.JEONSE_REFUGEE);
const BUILDING_HALMAE = toCharacter(DETAILED_CHARACTERS.BUILDING_HALMAE);

export const SURVIVAL_CARDS: Card[] = [
    {
        id: 'C-001',
        title: '월급날: 잠깐 스쳐가는 돈',
        character: NARRATOR,
        image: '',
        text: '월급 알림이 떴다. 마음이 잠깐 부풀었다가, 자동이체 알림이 그 마음을 바로 정리한다.\n부동산 앱은 친절하게도 "강남 신축 실거래가 갱신"을 띄운다.',
        leftChoice: {
            text: '현실을 본다',
            line: '"오늘은 김밥으로 타협."',
            effects: {
                statEffect: { mental: 2, fomo: -3 },
                addFlags: ['REALIST_START'],
                nextCardId: 'C-002'
            }
        },
        rightChoice: {
            text: '판을 뒤집는다',
            line: '"나도 사람답게… 강남?"',
            effects: {
                statEffect: { fomo: 5, mental: -2 },
                addFlags: ['DREAMER_START'],
                nextCardId: 'C-003'
            }
        },
        meta: {
            weight: 4,
            cooldown: 4,
            stages: ['ORDINARY_WORLD'],
            deck: 'main'
        }
    },
    {
        id: 'C-002',
        title: '월세 계약 연장: "법적 최대치만"',
        character: BUILDING_HALMAE,
        image: '',
        text: '집주인이 말했다. "요즘 시세가 올라서요. 그래도 법적 최대치만 올릴게요."\n최대치만이라는 말이 최저한의 예의처럼 들린다.',
        leftChoice: {
            text: '연장한다',
            line: '"그래요… 어차피 옮겨도 비슷하죠."',
            effects: {
                statEffect: { asset: -4, mental: -3 },
                addFlags: ['STAY_RENT']
            }
        },
        rightChoice: {
            text: '이사 알아본다',
            line: '"더 오르면 제가 무너져요."',
            effects: {
                statEffect: { mental: -5, fomo: 3 },
                addFlags: ['MOVE_SEARCH']
            }
        },
        meta: {
            weight: 3,
            cooldown: 5,
            stages: ['ORDINARY_WORLD', 'CALL_TO_ADVENTURE'],
            deck: 'main'
        }
    },
    {
        id: 'C-003',
        title: '부동산 유튜브 입문: 알고리즘의 포옹',
        character: YOUNGKKEUL,
        image: '',
        text: '"여러분, 지금 아니면 끝입니다." 영상은 끝났는데 다음 영상이 바로 재생된다.\n스크롤을 멈추는 손이 느려진다.',
        leftChoice: {
            text: '정보만 본다',
            line: '"공부는 배신하지 않겠지."',
            effects: {
                statEffect: { mental: 2, fomo: -2 },
                addFlags: ['WATCH_CAREFUL'],
                tags: ['youngkkeul_reject']
            }
        },
        rightChoice: {
            text: '구독 + 알림',
            line: '"이분은 진짜다."',
            effects: {
                statEffect: { fomo: 6, mental: -3 },
                addFlags: ['WATCH_DEEP'],
                setDeck: 'youngkkeul',
                deckLockTurns: 2,
                tags: ['youngkkeul_follow'],
                nextCardId: 'C-007'
            }
        },
        meta: {
            weight: 4,
            cooldown: 6,
            stages: ['CALL_TO_ADVENTURE', 'REFUSAL_OF_CALL'],
            deck: 'main'
        }
    },
    {
        id: 'C-004',
        title: '은행 상담: DSR의 벽',
        character: LOAN_OFFICER,
        image: '',
        text: '"고객님 DSR 40% 초과입니다. 1억 5천까지가 한도입니다."\n대출이 되면 길이 열릴 줄 알았는데, 벽이 더 선명해졌다.',
        leftChoice: {
            text: '좌절한다',
            line: '"그럼 끝이네요."',
            effects: {
                statEffect: { mental: -8, fomo: -3 }
            }
        },
        rightChoice: {
            text: '방법 찾기',
            line: '"합법적으로 우회할 길은…"',
            effects: {
                statEffect: { mental: 3, regulation: 4 },
                tags: ['regulation_endure']
            }
        },
        meta: {
            weight: 3,
            cooldown: 5,
            stages: ['REFUSAL_OF_CALL', 'MEETING_MENTOR'],
            deck: 'main'
        }
    },
    {
        id: 'C-005',
        title: '박복덕의 통화',
        character: NARRATOR,
        image: '',
        text: '박복덕이 전화를 걸어왔다. "애야, 너 지금 마음이 흔들리지? 흔들릴 때가 기회야."',
        leftChoice: {
            text: '조언을 듣는다',
            line: '"수치로 말해 주세요."',
            effects: {
                statEffect: { mental: 4, fomo: -2 },
                addFlags: ['BOKDEOK_1'],
                nextCardId: 'C-013'
            }
        },
        rightChoice: {
            text: '의심한다',
            line: '"다들 그렇게 말하더라."',
            effects: {
                statEffect: { mental: -2, fomo: 2 }
            }
        },
        meta: {
            weight: 2,
            cooldown: 6,
            stages: ['MEETING_MENTOR', 'CROSSING_THRESHOLD'],
            deck: 'main'
        }
    },
    {
        id: 'C-006',
        title: '첫 계약서: 도장 직전',
        character: LOAN_OFFICER,
        image: '',
        text: '서명란 앞에서 손이 멈췄다. 대출 2억, 월 이자 60만원.\n도장을 찍으면 되돌릴 수 없다.',
        leftChoice: {
            text: '도장 찍는다',
            line: '"지금 아니면 더 늦어."',
            effects: {
                statEffect: { asset: 12, mental: -8, regulation: 5 },
                addProperties: 1,
                addFlags: ['FIRST_CONTRACT']
            }
        },
        rightChoice: {
            text: '도망친다',
            line: '"나는 아직 준비가…"',
            effects: {
                statEffect: { mental: 5, fomo: 6 }
            }
        },
        meta: {
            weight: 3,
            cooldown: 6,
            stages: ['CROSSING_THRESHOLD'],
            deck: 'main'
        }
    },
    {
        id: 'C-007',
        title: '유튜브 연속 시청: 마지막 기회',
        character: YOUNGKKEUL,
        image: '',
        text: '"이번 주가 마지막입니다. 금리 인상 전 마지막 창!"\n댓글은 폭죽처럼 터진다. 당신도 손가락이 뜨겁다.',
        leftChoice: {
            text: '믿는다',
            line: '"이번엔 타이밍이야."',
            effects: {
                statEffect: { fomo: 10, mental: -6 },
                tags: ['youngkkeul_follow', 'debt']
            }
        },
        rightChoice: {
            text: '끊는다',
            line: '"과열은 경고다."',
            effects: {
                statEffect: { mental: 5, fomo: -4 },
                tags: ['youngkkeul_reject']
            }
        },
        meta: {
            weight: 4,
            cooldown: 4,
            stages: ['CALL_TO_ADVENTURE', 'REFUSAL_OF_CALL'],
            deck: 'youngkkeul'
        }
    },
    {
        id: 'C-008',
        title: '부모 찬스',
        character: NARRATOR,
        image: '',
        text: '전화기 너머 부모님 목소리가 묻는다. "얼마나 필요한데?"\n도움과 자존심 사이에서 숨이 막힌다.',
        leftChoice: {
            text: '요청한다',
            line: '"이번에만…"',
            effects: {
                statEffect: { asset: 8, mental: -4 },
                addFlags: ['ASK_PARENT_HELP']
            }
        },
        rightChoice: {
            text: '말 돌린다',
            line: '"그냥 안부였어요."',
            effects: {
                statEffect: { mental: 3, fomo: 2 },
                addFlags: ['NO_PARENT_HELP']
            }
        },
        meta: {
            weight: 2,
            cooldown: 8,
            stages: ['REFUSAL_OF_CALL', 'MEETING_MENTOR'],
            deck: 'main'
        }
    },
    {
        id: 'C-009',
        title: '강남엄마의 유혹',
        character: GANGNAM_UMMA,
        image: '',
        text: '"이 동네는 학군 값이야. 애들 생각하면 지금이 타이밍."\n말은 부드럽지만 계산기는 차갑다.',
        leftChoice: {
            text: '영끌한다',
            line: '"학군은 투자야."',
            effects: {
                statEffect: { asset: 15, mental: -10, regulation: 6 },
                addProperties: 1,
                addFlags: ['OWN_GANGNAM'],
                tags: ['debt']
            }
        },
        rightChoice: {
            text: '참는다',
            line: '"지금은 무리야."',
            effects: {
                statEffect: { mental: 4, fomo: 6 },
                tags: ['fomo_resist']
            }
        },
        meta: {
            weight: 2,
            cooldown: 7,
            stages: ['APPROACH_INMOST_CAVE'],
            deck: 'main',
            minStats: { fomo: 30 }
        }
    },
    {
        id: 'C-010',
        title: '금리 인상 속보',
        character: JEONSE_REFUGEE,
        image: '',
        text: '"기준금리 0.5% 추가 인상."\n월 이자가 10만원 더 오른다. 숨이 턱 막힌다.',
        leftChoice: {
            text: '버틴다',
            line: '"다들 버티잖아."',
            effects: {
                statEffect: { asset: -6, mental: -6 },
                tags: ['debt']
            }
        },
        rightChoice: {
            text: '정리한다',
            line: '"손해라도 정리."',
            effects: {
                statEffect: { asset: -10, mental: 4 },
                addProperties: -1
            }
        },
        meta: {
            weight: 3,
            cooldown: 4,
            stages: ['TESTS_ALLIES_ENEMIES', 'THE_ORDEAL'],
            deck: 'main',
            minStats: { asset: 20 }
        }
    },
    {
        id: 'C-011',
        title: '규제 발표: LTV 하향',
        character: LOAN_OFFICER,
        image: '',
        text: '"LTV가 40%로 낮아집니다."\n갈아타기는 멀어졌고, 현금은 더 귀해졌다.',
        leftChoice: {
            text: '분노한다',
            line: '"이게 나라냐."',
            effects: {
                statEffect: { regulation: 8, mental: -4 },
                tags: ['regulation_endure']
            }
        },
        rightChoice: {
            text: '수용한다',
            line: '"시장이 식겠지."',
            effects: {
                statEffect: { regulation: -3, mental: 3 },
                tags: ['regulation_endure']
            }
        },
        meta: {
            weight: 3,
            cooldown: 5,
            stages: ['TESTS_ALLIES_ENEMIES', 'APPROACH_INMOST_CAVE'],
            deck: 'main'
        }
    },
    {
        id: 'C-012',
        title: '경매 위기: 역전세',
        character: LOAN_OFFICER,
        image: '',
        text: '세입자가 보증금을 돌려달라고 한다. 집값은 내려갔고 대출은 그대로다.\n"3개월 내 상환" 통지서가 날아왔다.',
        leftChoice: {
            text: '손절한다',
            line: '"더 늦기 전에."',
            effects: {
                statEffect: { asset: -20, mental: -10 },
                addProperties: -1
            }
        },
        rightChoice: {
            text: '존버한다',
            line: '"버티면 오르겠지."',
            effects: {
                statEffect: { mental: -15, fomo: -2 },
                tags: ['crash_hold']
            }
        },
        meta: {
            weight: 2,
            cooldown: 6,
            stages: ['THE_ORDEAL'],
            deck: 'main',
            minStats: { asset: 10 }
        }
    },
    {
        id: 'C-013',
        title: '박복덕의 두 번째 제안',
        character: NARRATOR,
        image: '',
        text: '"재건축 조합원 분양권 나왔어. 지금 아니면 못 잡아."\n숫자가 머릿속을 점령한다.',
        leftChoice: {
            text: '도전한다',
            line: '"승부수다."',
            effects: {
                statEffect: { asset: 8, mental: -8, regulation: 6 },
                addFlags: ['BOKDEOK_2'],
                tags: ['debt']
            }
        },
        rightChoice: {
            text: '물러선다',
            line: '"지금은 아니다."',
            effects: {
                statEffect: { mental: 4, fomo: 5 },
                tags: ['fomo_resist']
            }
        },
        meta: {
            weight: 2,
            cooldown: 7,
            stages: ['APPROACH_INMOST_CAVE', 'THE_ORDEAL'],
            deck: 'main',
            requiredFlagsAll: ['BOKDEOK_1']
        }
    },
    {
        id: 'C-014',
        title: '상가 매물',
        character: BUILDING_HALMAE,
        image: '',
        text: '"이 상가, 월세만 250이야."\n공실 리스크는 있지만, 숫자는 매혹적이다.',
        leftChoice: {
            text: '매수한다',
            line: '"현금흐름이 답."',
            effects: {
                statEffect: { asset: 10, mental: -6, regulation: 4 },
                addProperties: 1,
                addFlags: ['OWN_COMMERCIAL']
            }
        },
        rightChoice: {
            text: '보류한다',
            line: '"공실이 더 무서워."',
            effects: {
                statEffect: { mental: 4, fomo: 3 }
            }
        },
        meta: {
            weight: 1,
            cooldown: 8,
            stages: ['REWARD', 'THE_ROAD_BACK'],
            deck: 'main',
            minStats: { asset: 40 }
        }
    },
    {
        id: 'C-015',
        title: '박복덕의 마지막 테스트',
        character: NARRATOR,
        image: '',
        text: '"네가 원하는 건 돈이냐, 버틸 자존심이냐."\n박복덕은 웃으며 계산기를 닫았다.',
        leftChoice: {
            text: '자존심을 택한다',
            line: '"난 버틴다."',
            effects: {
                statEffect: { mental: 8, fomo: -4 },
                addFlags: ['BOKDEOK_3'],
                tags: ['fomo_resist']
            }
        },
        rightChoice: {
            text: '돈을 택한다',
            line: '"기회는 지금."',
            effects: {
                statEffect: { asset: 6, mental: -4 },
                addFlags: ['BOKDEOK_3'],
                tags: ['debt']
            }
        },
        meta: {
            weight: 1,
            cooldown: 9,
            stages: ['REWARD', 'THE_ROAD_BACK'],
            deck: 'main',
            requiredFlagsAll: ['BOKDEOK_2']
        }
    },
    {
        id: 'C-016',
        title: '다주택 유혹',
        character: JEONSE_REFUGEE,
        image: '',
        text: '"갭투자야. 전세 끼고 한 채 더."\n확장과 파산은 종이 한 장 차이 같다.',
        leftChoice: {
            text: '한 채 더',
            line: '"지금이 확장 타이밍."',
            effects: {
                statEffect: { asset: 6, fomo: 5, regulation: 8 },
                addProperties: 1,
                tags: ['debt']
            }
        },
        rightChoice: {
            text: '멈춘다',
            line: '"1채면 충분."',
            effects: {
                statEffect: { mental: 6, fomo: -4 }
            }
        },
        meta: {
            weight: 2,
            cooldown: 6,
            stages: ['THE_ROAD_BACK', 'RESURRECTION'],
            deck: 'main',
            minStats: { asset: 30 }
        }
    },
    {
        id: 'C-017',
        title: '세무조사 통보',
        character: LOAN_OFFICER,
        image: '',
        text: '"세무조사를 통보드립니다."\n대출보다 무서운 건, 시간이 빨려 나가는 느낌이다.',
        leftChoice: {
            text: '협조한다',
            line: '"최대한 투명하게."',
            effects: {
                statEffect: { asset: -8, regulation: -6 }
            }
        },
        rightChoice: {
            text: '변호사 선임',
            line: '"싸워야 산다."',
            effects: {
                statEffect: { asset: -12, mental: -6 }
            }
        },
        meta: {
            weight: 2,
            cooldown: 7,
            stages: ['RESURRECTION'],
            deck: 'main',
            minStats: { regulation: 40 }
        }
    },
    {
        id: 'C-018',
        title: '상승장 자랑',
        character: JEONSE_REFUGEE,
        image: '',
        text: '친구가 말했다. "우리 집 5억에서 7억 됐다."\n축하해야 하는데 속이 쓰리다.',
        leftChoice: {
            text: '기뻐한다',
            line: '"잘됐다."',
            effects: {
                statEffect: { mental: 6, fomo: -3 }
            }
        },
        rightChoice: {
            text: '질투한다',
            line: '"왜 나만?"',
            effects: {
                statEffect: { mental: -6, fomo: 6 }
            }
        },
        meta: {
            weight: 3,
            cooldown: 4,
            stages: ['TESTS_ALLIES_ENEMIES', 'APPROACH_INMOST_CAVE'],
            deck: 'main'
        }
    },
    {
        id: 'C-019',
        title: '전설의 하루',
        character: NARRATOR,
        image: '',
        text: '오늘은 묘하게 조용하다. 규제도, 소문도 잠잠하다.\n당신은 숨을 고르며 다음 걸음을 생각한다.',
        leftChoice: {
            text: '정리한다',
            line: '"이쯤에서 균형."',
            effects: {
                statEffect: { mental: 6, regulation: -4 }
            }
        },
        rightChoice: {
            text: '확장한다',
            line: '"아직 끝이 아니다."',
            effects: {
                statEffect: { asset: 6, fomo: 4 },
                tags: ['debt']
            }
        },
        meta: {
            weight: 2,
            cooldown: 4,
            stages: ['RETURN_WITH_ELIXIR'],
            deck: 'main'
        }
    },
    {
        id: 'END-001',
        title: '엔딩: 서울 부동산 생존자',
        character: NARRATOR,
        image: '',
        text: '당신은 끝내 서울 부동산 정글을 버텼다.\n완벽한 승리도, 완전한 패배도 아니다.\n다만 오늘도 무너지지 않았을 뿐.',
        leftChoice: {
            text: '엔딩 보기',
            effects: { statEffect: {} }
        },
        rightChoice: {
            text: '회고하기',
            effects: { statEffect: {} }
        },
        type: 'ending',
        meta: {
            weight: 1,
            cooldown: 0,
            stages: ['RETURN_WITH_ELIXIR'],
            deck: 'ending'
        }
    }
];
