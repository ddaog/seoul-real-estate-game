import type { Character, HeroPathStage, Stats } from '../types';
import { CHARACTERS } from './characters';

export type LegacyChoice = {
    text: string;
    line?: string;
    effect: Partial<Stats>;
};

export type LegacyCard = {
    title?: string;
    text: string;
    character: Character;
    image?: string;
    leftChoice: LegacyChoice;
    rightChoice: LegacyChoice;
};

/**
 * Reportage-style scenarios (르포타주 소설 스타일)
 * Each scenario includes:
 * - Specific time/place details
 * - Sensory descriptions  
 * - Internal thoughts
 * - Character-specific dialogue
 */

export const REPORTAGE_SCENARIOS: Record<HeroPathStage, Array<LegacyCard>> = {
    ORDINARY_WORLD: [
        {
            text: `목요일 저녁 7시 32분, 핸드폰이 울렸다.

발신자는 '집주인'이었다. 수화기 너머로 들리는 목소리는 여전히 무덤덤했다.

"월세요. 다음 달부터 10만원 오릅니다. 시세가 올랐거든. 주변이 다 올렸어요."

통화 종료 버튼을 누르는 내 손이 떨렸다. 한 달 300만원이 320만원이 된다. 올해 연봉 인상률은 2%였는데.`,
            character: CHARACTERS['SHADOW'],
            leftChoice: { text: "항의한다", effect: { mental: -10, regulation: 5 } },
            rightChoice: { text: "순순히 수락", effect: { asset: -5, mental: -5 } }
        },
        {
            text: `새벽 2시, 천장에서 또 '쿵쿵' 소리가 들렸다.

참다 못해 위층 현관문을 두드렸다. 문이 열렸고, 술 냄새가 풍겼다.

"뭐야 새벽에? 내가 뭘 어쨌는데!"

계단 아래에서 경찰이 올라오는 소리가 들렸다. 누군가 신고를 했나보다.`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "사과한다", effect: { mental: -5, regulation: -5 } },
            rightChoice: { text: "맞서 싸운다", effect: { mental: -15, regulation: 10 } }
        },
        {
            text: `친구의 신혼집 집들이였다. 32평, 신축, 한강 뷰.

"대출? 2억 정도? 부모님이 좀 보태주셨어."

집으로 돌아오는 지하철 안. 창문에 비친 내 얼굴이 초라해 보였다. 내일도 월세방에서 눈을 뜰 것이다.`,
            character: CHARACTERS['ALLY'],
            leftChoice: { text: "부러워한다", effect: { fomo: 15, mental: -10 } },
            rightChoice: { text: "만족한다", effect: { mental: 5, fomo: -5 } }
        }
    ],

    CALL_TO_ADVENTURE: [
        {
            text: `"야, 청약 들어가자. 이번 청약은 진짜 대박이야."

동기의 목소리에는 흥분이 섞여 있었다. 스마트폰 화면에는 '00아파트 1순위 청약' 공고가 떠 있었다.

"분양가가 시세보다 3억 싸. 당첨되면 로또야."

창밖으로 퇴근길 사람들이 보였다. 다들 어디론가 바삐 걸어가고 있었다.`,
            character: CHARACTERS['ALLY'],
            leftChoice: { text: "청약 넣는다", effect: { asset: -3, fomo: -10, mental: 5 } },
            rightChoice: { text: "거절한다", effect: { fomo: 15, mental: -3 } }
        },
        {
            text: `전세 계약 만기 6개월 전. 집주인에게서 문자가 왔다.

"혹시 이 집 살 생각 없으세요? 5억이면 드릴게요. 시세는 5억 5천인데."

손가락이 화면 위에서 멈췄다. 5억. 내 통장 잔고는 3천만원. 대출은 받을 수 있을까?`,
            character: CHARACTERS['SHADOW'],
            leftChoice: { text: "관심 보인다", effect: { fomo: 10, asset: -5 } },
            rightChoice: { text: "무시한다", effect: { mental: 5 } }
        },
        {
            text: `유튜브 알고리즘이 추천한 영상. 썸네일에는 "마지막 기회!"라는 빨간 글씨.

"여러분, 이번 주가 진짜 마지막입니다. 다음 달부터 금리 또 오릅니다. 지금 아니면 평생 집 못 삽니다!"

구독자 50만, 조회수 120만. 댓글창에는 "선생님 덕분에 집 샀어요"라는 글이 보였다.`,
            character: CHARACTERS['TRICKSTER'],
            leftChoice: { text: "믿는다", effect: { fomo: 20, mental: -10 } },
            rightChoice: { text: "무시한다", effect: { mental: 10, fomo: -5 } }
        }
    ],

    REFUSAL_OF_CALL: [
        {
            text: `"서울 집값? 너는 포기해. 지방으로 내려와."

부모님의 목소리는 단호했다. 명절 저녁, 온 가족이 모인 자리였다.

"네 월급으로 서울에 집을 사? 꿈 깨. 차라리 부산이나 대구 알아봐."

밥맛이 없었다. 포기하라는 말이 계속 머릿속을 맴돌았다.`,
            character: CHARACTERS['MENTOR'],
            leftChoice: { text: "포기 안 해!", effect: { mental: 10, fomo: 10 } },
            rightChoice: { text: "말씀이 맞아", effect: { mental: -15, fomo: -10 } }
        },
        {
            text: `은행 상담 창구. 정장을 입은 직원이 컴퓨터 화면을 보다가 고개를 저었다.

"죄송합니다만, 고객님의 DSR이 40%를 초과하여 대출이 어렵습니다."

"그럼... 얼마까지 가능한가요?"

"1억 5천... 정도요. 원하시는 2억은 어렵습니다."

은행 밖으로 나왔다. 하늘이 유난히 낮아 보였다.`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "좌절한다", effect: { mental: -20, fomo: -10 } },
            rightChoice: { text: "방법 찾기", effect: { mental: 5, regulation: 5 } }
        }
    ],

    MEETING_MENTOR: [
        {
            text: `부동산 중개소. 벽에 걸린 공인중개사 자격증 옆에는 '경력 40년'이라는 액자가 있었다.

"애야, 지금이 매수 타이밍이야. 내가 이 바닥에서 40년 봤는데, 지금 안 사면 평생 못 사."

주름진 손가락이 시세표를 가리켰다.

"이 가격, 다음 달이면 5천 오를 거야. 내 말이 틀린 적 없어."`,
            character: CHARACTERS['MENTOR'],
            leftChoice: { text: "못 믿겠다", effect: { mental: 5 } },
            rightChoice: { text: "계약한다", effect: { asset: -20, fomo: -20, mental: 10 } }
        },
        {
            text: `회사 선배가 커피를 건네며 말했다.

"나도 너처럼 고민했어. 그런데 지금 생각해보면 그때 안 샀으면 큰일 날 뻔했지."

선배는 3년 전에 집을 샀다고 했다. 지금 시세로는 2억이 올랐다고.

"빚내서라도 사. 나중에 후회하는 것보다 지금 빚이 나아."`,
            character: CHARACTERS['ALLY'],
            leftChoice: { text: "따른다", effect: { asset: -15, fomo: -15, regulation: 10 } },
            rightChoice: { text: "무시한다", effect: { mental: 10 } }
        }
    ],

    CROSSING_THRESHOLD: [
        {
            text: `대출 서류 마지막 장. 서명란에 도장을 찍어야 했다.

은행 직원이 말했다. "2억 대출입니다. 월 이자가 약 60만원 정도 되십니다."

손이 떨렸다. 도장을 찍는 순간, 돌이킬 수 없다. 30년 동안 이 빚을 갚아야 한다.

시계가 3시를 가리켰다. 결정할 시간이다.`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "도장 찍는다", effect: { asset: 30, mental: -15, regulation: 10 } },
            rightChoice: { text: "도망친다", effect: { mental: 10, fomo: 20 } }
        },
        {
            text: `스마트폰 뱅킹 앱. 계약금 5천만원을 송금하려니 손가락이 멈췄다.

확인을 누르면 내 통장 잔고는 0원이 된다. 5년간 모은 돈 전부다.

창밖 하늘은 맑았다. 새로운 시작일까, 아니면 파멸의 시작일까.

'송금하시겠습니까?' 팝업이 떠 있었다.`,
            character: CHARACTERS['MENTOR'],
            leftChoice: { text: "후회한다", effect: { mental: -15 } },
            rightChoice: { text: "기대한다", effect: { mental: 10, fomo: -10 } }
        }
    ],

    TESTS_ALLIES_ENEMIES: [
        {
            text: `뉴스 속보. "한국은행, 기준금리 0.5% 추가 인상"

전화기가 울렸다. 은행이었다.

"고객님, 다음 달부터 대출 이자가 월 60만원에서 70만원으로 인상됩니다."

월급은 그대로인데 이자는 계속 오른다. 식탁 위에 쌓인 관리비 고지서를 봤다.`,
            character: CHARACTERS['TRICKSTER'],
            leftChoice: { text: "버틴다", effect: { asset: -10, mental: -10 } },
            rightChoice: { text: "집 판다", effect: { asset: -15, fomo: -10, mental: 5 } }
        },
        {
            text: `정부 발표. "LTV 50%에서 40%로 하향. DSR 40%로 강화."

부동산 카페가 난리였다. "이제 집 어떻게 사?" "규제 미쳤다"

나는 이미 집을 샀다. 하지만 다음에 집을 바꾸려면? 갈아타기가 불가능해졌다.`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "분노한다", effect: { regulation: 15, mental: -10 } },
            rightChoice: { text: "수용한다", effect: { regulation: -5, mental: 5 } }
        },
        {
            text: `"야, 우리 집 팔렸어. 5억 5천!"

같은 단지, 같은 평수. 전세난민 동기가 웃으며 말했다.

내 집 시세는 5억. 5개월 차이인데 옆집이 5천만원 더 받았다.

"너도 팔 때 됐잖아? 부럽지?"`,
            character: CHARACTERS['ALLY'],
            leftChoice: { text: "기쁘다", effect: { mental: 10, asset: 5 } },
            rightChoice: { text: "질투난다", effect: { mental: -10, fomo: 10 } }
        }
    ],

    APPROACH_INMOST_CAVE: [
        {
            text: `강남 재건축 단지. 박복덕이 전화를 걸어왔다.

"애야, 대어가 나왔어. 강남 재건축 조합원 분양권. 10억인데, 너 한계 대출 받으면 될 거야."

계산기를 두드렸다. DSR 50%. 월 이자 150만원.

"지금 아니면 강남은 평생 꿈도 못 꿔."`,
            character: CHARACTERS['SHAPESHIFTER'],
            leftChoice: { text: "영끌한다!", effect: { asset: -30, fomo: -30, mental: -20, regulation: 15 } },
            rightChoice: { text: "참는다", effect: { mental: 10, fomo: 25 } }
        },
        {
            text: `재건축 안전진단 통과 소식. 용적률 350%에서 500%로.

"지금 사두면 3년 후 입주 때 10억은 벌어요."

박복덕의 말에 심장이 뛰었다. 하지만 지금 대출을 더 받으면 월급의 70%가 이자다.

한강이 내려다보이는 그 아파트. 손에 잡힐 듯 잡히지 않는다.`,
            character: CHARACTERS['MENTOR'],
            leftChoice: { text: "도전한다", effect: { asset: 20, mental: -20, regulation: 15 } },
            rightChoice: { text: "포기한다", effect: { fomo: 30, mental: 5 } }
        }
    ],

    THE_ORDEAL: [
        {
            text: `네이버 부동산. 내 집 시세가 빨간색으로 떨어지고 있었다.

-5%, -10%, -20%... -30%.

6억이 4억 2천이 되었다. 대출은 3억. 역전세 사태다.

핸드폰이 울렸다. 전세 세입자였다. "집주인님, 보증금 언제 돌려받나요?"`,
            character: CHARACTERS['TRICKSTER'],
            leftChoice: { text: "손절한다", effect: { asset: -25, mental: -20 } },
            rightChoice: { text: "존버한다", effect: { mental: -30, fomo: -10 } }
        },
        {
            text: `은행 지점. 이대출이 서류를 건네며 말했다.

"고객님, 죄송하지만 대출 연장이 어렵습니다. 3개월 내로 상환하셔야 합니다."

"3개월 안에 3억을 어떻게..."

"저희도 어쩔 수 없습니다. 본부 지침입니다."

밖으로 나오니 비가 내리고 있었다.`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "집 판다", effect: { asset: -30, mental: -25 } },
            rightChoice: { text: "버틴다", effect: { mental: -35, regulation: 10 } }
        }
    ],

    REWARD: [
        {
            text: `등기소에서 온 등기필증. 두꺼운 봉투를 뜯었다.

'소유권 이전 등기 완료'

종이를 손으로 만졌다. 진짜 내 집이다. 3년간의 대출 전쟁이 끝났다.

창밖으로 석양이 지고 있었다. 오늘은 왠지 눈물이 날 것만 같았다.`,
            character: CHARACTERS['MENTOR'],
            leftChoice: { text: "기뻐한다", effect: { mental: 20, fomo: -20 } },
            rightChoice: { text: "무덤덤", effect: { mental: 5 } }
        },
        {
            text: `네이버 부동산 시세. 내 집이 5억에서 7억이 되었다.

2억 차익. 세금 떼면 1억 5천.

전세난민 동기가 문자를 보냈다. "축하해. 진심으로. 부럽다."

팔까? 아니면 계속 가져갈까?`,
            character: CHARACTERS['ALLY'],
            leftChoice: { text: "판다", effect: { asset: 20, fomo: -15 } },
            rightChoice: { text: "보유한다", effect: { mental: 10 } }
        }
    ],

    THE_ROAD_BACK: [
        {
            text: `"야, 팔고 한 채 더 사. 갭투자야."

전세난민 동기가 눈을 빛내며 말했다.

"전세 3억에 매매가 5억이면 2억으로 집 한 채 더 사는 거지. 시세차익 두 배야."

계산기를 두드렸다. 가능은 하다. 하지만 1주택에서 2주택이 되면 종부세가...`,
            character: CHARACTERS['ALLY'],
            leftChoice: { text: "또 산다", effect: { asset: 15, fomo: 10, regulation: 15 } },
            rightChoice: { text: "여기서 끝", effect: { mental: 15, fomo: -15 } }
        },
        {
            text: `국세청 문자. '종부세 과세 대상자로 선정되었습니다.'

2주택. 공시가 합산 12억.

세금 계산을 해봤다. 종부세 800만원. 여기에 재산세까지 합치면 연 1,200만원.

강남엄마가 카톡을 보냈다. "한 채 팔아요. 세금이 더 무서워요."`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "팔아야지", effect: { asset: 10, regulation: -10 } },
            rightChoice: { text: "버틴다", effect: { asset: -10, regulation: 15 } }
        }
    ],

    RESURRECTION: [
        {
            text: `우편함에 등기가 와 있었다. 국세청이었다.

'종합부동산세 납부 고지서. 1,450만원'

손이 떨렸다. 1년 전에는 600만원이었는데 도대체 왜...

세무사에게 전화를 걸었다. "공시가가 올라서 그래요. 올해부터 기준이 바뀌었거든요."`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "낸다", effect: { asset: -20, regulation: -10 } },
            rightChoice: { text: "항의한다", effect: { regulation: 10, mental: -10 } }
        },
        {
            text: `"국세청 재산세과입니다. 세무조사 실시를 통보드립니다."

통화를 끊고 나니 손에 땀이 났다.

다주택자 표적 조사. 취득자금 출처, 증여세 회피 의심.

변호사 상담료만 500만원. 세무조사가 끝나려면 6개월은 걸린다고 했다.`,
            character: CHARACTERS['GUARDIAN'],
            leftChoice: { text: "협조한다", effect: { asset: -15, regulation: -15 } },
            rightChoice: { text: "변호사 선임", effect: { asset: -20, mental: -15 } }
        }
    ],

    RETURN_WITH_ELIXIR: [
        {
            text: `강남 빌딩. 5층짜리 상가건물.

월 임대수익 3천만원. 연 3억 6천.

빌딩할매가 말했다. "이제 당신도 건물주야. 월세 올리는 건 당신 마음이고."

내가 월세를 '받는' 사람이 되었다.

그런데 왜일까. 기쁘기보다는 묘한 죄책감이 들었다.`,
            character: CHARACTERS['MENTOR'],
            leftChoice: { text: "월세 올린다", effect: { asset: 10, regulation: 10 } },
            rightChoice: { text: "착하게 산다", effect: { mental: 10, regulation: -5 } }
        },
        {
            text: `타워팰리스 거실. 한강이 한눈에 내려다보인다.

"서울 강남에 빌딩 한 채. 임대수익만 월 5천..."

빌딩할매가 차를 따르며 웃었다.

"은퇴하지 그래? 이제 놀면서 먹고 살 수 있잖아?"

창밖으로 서울 시내가 보였다. 저 아래 어딘가에 월세방에 사는 내가 있었다.`,
            character: CHARACTERS['SHADOW'],
            leftChoice: { text: "은퇴한다", effect: { mental: 30, asset: 5 } },
            rightChoice: { text: "더 산다", effect: { asset: 15, fomo: 10 } }
        }
    ]
};
