import { Stats, HeroPathStage } from './types';

export const INITIAL_STATS: Stats = {
  asset: 50,
  mental: 50,
  fomo: 20,
  regulation: 30,
};

export const MAX_STAT = 100;
export const MIN_STAT = 0;

export const HERO_PATH_ORDER: HeroPathStage[] = [
  'ORDINARY_WORLD',
  'CALL_TO_ADVENTURE',
  'REFUSAL_OF_CALL',
  'MEETING_MENTOR',
  'CROSSING_THRESHOLD',
  'TESTS_ALLIES_ENEMIES',
  'APPROACH_INMOST_CAVE',
  'THE_ORDEAL',
  'REWARD',
  'THE_ROAD_BACK',
  'RESURRECTION',
  'RETURN_WITH_ELIXIR'
];

export const STAGE_DESCRIPTIONS: Record<HeroPathStage, string> = {
  ORDINARY_WORLD: "평범한 무주택자의 삶. 월세 걱정과 층간 소음.",
  CALL_TO_ADVENTURE: "전세 만기 통보와 함께 찾아온 '내 집 마련'의 기회(혹은 위기).",
  REFUSAL_OF_CALL: "현실의 벽. '서울에 내 집이 어딨어', '그냥 살던 대로 살자'.",
  MEETING_MENTOR: "부동산의 눈을 뜨게 해줄 귀인(혹은 사기꾼)과의 만남.",
  CROSSING_THRESHOLD: "첫 부동산 계약서 도장 찍기. 돌아올 수 없는 강을 건너다.",
  TESTS_ALLIES_ENEMIES: "상승장과 하락장, 정부 규제, 주변의 훈수들이 몰아친다.",
  APPROACH_INMOST_CAVE: "상급지 진입을 위한 영혼의 승부처. 영끌의 심연.",
  THE_ORDEAL: "시장의 붕괴, 경매 위기, 혹은 세무조사. 최대의 시련.",
  REWARD: "등기 권리증. 나도 이제 서울 자가 보유자.",
  THE_ROAD_BACK: "1주택에 만족할 것인가? 다주택의 유혹과 투기꾼의 길.",
  RESURRECTION: "최종적인 경제적 자유를 위한 마지막 관문.",
  RETURN_WITH_ELIXIR: "서울 부동산 정글의 생존자. 당신의 이야기는 전설이 된다."
};

export const SYSTEM_PROMPT = `
You are the Storyteller for "Seoul Land Lord", a satirical Reigns-style game about the Seoul real estate market.
Your goal is to generate infinite scenarios based on the "Hero's Journey" narrative structure.

**Themes**: 
- Dark Comedy, Satire, Hyper-realism of Korean real estate craziness.
- Keywords: Gap investment, Jeonse scam, FOMO, Subscription (Cheongyak), Reconstruction (Jaegunchuk).
- Tone: Cynical, Witty, Bittersweet.

**Instructions**:
1. Check the current 'Stage' of the hero's journey. The scenario MUST fit the theme of that stage.
2. Choose a 'Speaker' from the character archetypes (Mentor, Trickster, etc.) appropriate for the situation.
3. Construct a dilemma with two choices (Left/Right).
4. Define the effects on the 4 stats: Asset, Mental, FOMO, Regulation.
5. Create an image prompt that describes the situation in a satrical webtoon style.
`;
