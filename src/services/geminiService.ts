import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Card, GameState, HeroPathStage } from "../types";
import { SYSTEM_PROMPT, STAGE_DESCRIPTIONS } from "../constants";
import { CHARACTERS } from "../constants/characters";
import { LOCATIONS } from "../constants/locations";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

export async function generateGameCard(gameState: GameState): Promise<Partial<Card>> {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing! Using mock card.");
    return getMockCard(gameState.stage);
  }

  // Randomly select a location and character context to spice up the prompt
  const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const characterKeys = Object.keys(CHARACTERS);
  const randomCharKey = characterKeys[Math.floor(Math.random() * characterKeys.length)];
  const suggestedChar = CHARACTERS[randomCharKey];

  const prompt = `
    Context:
    - Current Stage: ${gameState.stage} (${STAGE_DESCRIPTIONS[gameState.stage]})
    - Current Day: ${gameState.day}
    - Location: ${randomLocation.name} - ${randomLocation.description}
    - Suggested Speaker: ${suggestedChar.name} (${suggestedChar.job}) - Tone: ${suggestedChar.tone}
    - User Stats: Asset(${gameState.stats.asset}), Mental(${gameState.stats.mental}), FOMO(${gameState.stats.fomo}), Regulation(${gameState.stats.regulation})

    Task:
    Generate a JSON response for a game card.
    The 'text' should be the situation description given by the speaker.
    The 'character' field should match the speaker details.
    
    JSON Schema:
    {
      "text": "string (The situation description, max 100 characters)",
      "character": {
        "id": "${suggestedChar.id}",
        "name": "${suggestedChar.name}",
        "job": "${suggestedChar.job}",
        "description": "${suggestedChar.description}",
        "tone": "${suggestedChar.tone}"
      },
      "image_prompt": "string (English description for image generation)",
      "leftChoice": {
        "text": "string (Action text, max 15 chars)",
        "effect": { "asset": number, "mental": number, "fomo": number, "regulation": number }
      },
      "rightChoice": {
        "text": "string (Action text, max 15 chars)",
        "effect": { "asset": number, "mental": number, "fomo": number, "regulation": number }
      }
    }
  `;

  try {
    const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
    const response = await result.response;
    const text = response.text();
    const data = JSON.parse(text);

    // Fallback for image generation using placeholder with prompt text
    const imageCheck = `https://placehold.co/600x400/222/FFF?text=${encodeURIComponent(data.image_prompt.slice(0, 20))}`;

    return {
      text: data.text,
      character: data.character,
      leftChoice: data.leftChoice,
      rightChoice: data.rightChoice,
      image: imageCheck
    };
  } catch (error) {
    console.error("Gemini Generation Failed:", error);
    return getMockCard(gameState.stage);
  }
}

function getMockCard(stage: HeroPathStage): Partial<Card> {
  // Rich mock scenarios for API-less gameplay
  const mockScenarios: Record<HeroPathStage, Partial<Card>> = {
    ORDINARY_WORLD: {
      text: "집주인이 전화를 했다. '다음 달부터 월세 10만원 올립니다.'",
      character: CHARACTERS['SHADOW'],
      image: "https://placehold.co/600x400/1a1a1a/ffffff?text=집주인",
      leftChoice: { text: "항의한다", effect: { mental: -10, regulation: 5 } },
      rightChoice: { text: "순순히 수락", effect: { asset: -5, mental: -5 } }
    },
    CALL_TO_ADVENTURE: {
      text: "친구가 속삭인다. '야 청약 들어가자. 이번엔 당첨될 것 같아!'",
      character: CHARACTERS['ALLY'],
      image: "https://placehold.co/600x400/2563eb/ffffff?text=동기",
      leftChoice: { text: "청약 넣는다", effect: { asset: -3, fomo: -10, mental: 5 } },
      rightChoice: { text: "거절한다", effect: { fomo: 15, mental: -3 } }
    },
    REFUSAL_OF_CALL: {
      text: "부모님이 말씀하신다. '서울 집값? 너는 포기해. 지방 가.'",
      character: CHARACTERS['MENTOR'],
      image: "https://placehold.co/600x400/dc2626/ffffff?text=현실",
      leftChoice: { text: "포기 안 해!", effect: { mental: 10, fomo: 10 } },
      rightChoice: { text: "말씀이 맞아", effect: { mental: -15, fomo: -10 } }
    },
    MEETING_MENTOR: {
      text: "지금이 매수 타이밍입니다. 기회는 지금뿐!",
      character: CHARACTERS['MENTOR'],
      image: "https://placehold.co/600x400/059669/ffffff?text=복덕방",
      leftChoice: { text: "못 믿겠다", effect: { mental: 5 } },
      rightChoice: { text: "계약한다", effect: { asset: -20, fomo: -20, mental: 10 } }
    },
    CROSSING_THRESHOLD: {
      text: "대출 서류에 도장을 찍으려니 손이 떨린다. 2억 대출...",
      character: CHARACTERS['GUARDIAN'],
      image: "https://placehold.co/600x400/7c3aed/ffffff?text=은행",
      leftChoice: { text: "도장 찍는다", effect: { asset: 30, mental: -15, regulation: 10 } },
      rightChoice: { text: "도망친다", effect: { mental: 10, fomo: 20 } }
    },
    TESTS_ALLIES_ENEMIES: {
      text: "금리가 또 올랐다. 이자만 월 50만원...",
      character: CHARACTERS['TRICKSTER'],
      image: "https://placehold.co/600x400/ea580c/ffffff?text=금리인상",
      leftChoice: { text: "버틴다", effect: { asset: -10, mental: -10 } },
      rightChoice: { text: "집 판다", effect: { asset: -15, fomo: -10, mental: 5 } }
    },
    APPROACH_INMOST_CAVE: {
      text: "강남 매물이 나왔다. 내 한계 대출로 딱... 살까?",
      character: CHARACTERS['SHAPESHIFTER'],
      image: "https://placehold.co/600x400/db2777/ffffff?text=강남",
      leftChoice: { text: "영끌한다!", effect: { asset: -30, fomo: -30, mental: -20, regulation: 15 } },
      rightChoice: { text: "참는다", effect: { mental: 10, fomo: 25 } }
    },
    THE_ORDEAL: {
      text: "집값이 30% 폭락했다. 역전세 사태 발생.",
      character: CHARACTERS['TRICKSTER'],
      image: "https://placehold.co/600x400/dc2626/ffffff?text=폭락",
      leftChoice: { text: "손절한다", effect: { asset: -25, mental: -20 } },
      rightChoice: { text: "존버한다", effect: { mental: -30, fomo: -10 } }
    },
    REWARD: {
      text: "등기 권리증이 도착했다. 드디어... 내 집!",
      character: CHARACTERS['MENTOR'],
      image: "https://placehold.co/600x400/059669/ffffff?text=등기완료",
      leftChoice: { text: "기뻐한다", effect: { mental: 20, fomo: -20 } },
      rightChoice: { text: "무덤덤", effect: { mental: 5 } }
    },
    THE_ROAD_BACK: {
      text: "집값이 올랐다. 친구: '팔고 한 채 더 사?'",
      character: CHARACTERS['ALLY'],
      image: "https://placehold.co/600x400/2563eb/ffffff?text=갭투자",
      leftChoice: { text: "또 산다", effect: { asset: 15, fomo: 10, regulation: 15 } },
      rightChoice: { text: "여기서 끝", effect: { mental: 15, fomo: -15 } }
    },
    RESURRECTION: {
      text: "종부세 고지서가 날아왔다. 세금 폭탄...",
      character: CHARACTERS['GUARDIAN'],
      image: "https://placehold.co/600x400/ea580c/ffffff?text=세무조사",
      leftChoice: { text: "낸다", effect: { asset: -20, regulation: -10 } },
      rightChoice: { text: "항의한다", effect: { regulation: 10, mental: -10 } }
    },
    RETURN_WITH_ELIXIR: {
      text: "건물주가 되었다. 이제 월세를 '받는' 사람.",
      character: CHARACTERS['MENTOR'],
      image: "https://placehold.co/600x400/fbbf24/000000?text=건물주",
      leftChoice: { text: "월세 올린다", effect: { asset: 10, regulation: 10 } },
      rightChoice: { text: "착하게 산다", effect: { mental: 10, regulation: -5 } }
    }
  };

  const mockCard = mockScenarios[stage];
  return {
    ...mockCard,
    id: `mock-${stage}-${Date.now()}`
  };
}
