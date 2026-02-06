import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Card, GameState, HeroPathStage } from "../types";
import { SYSTEM_PROMPT, STAGE_DESCRIPTIONS } from "../constants";
import { CHARACTERS } from "../constants/characters";
import { LOCATIONS } from "../constants/locations";
import { REPORTAGE_SCENARIOS, type LegacyCard } from "../constants/scenarios";

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
  const characterKeys = Object.keys(CHARACTERS) as Array<keyof typeof CHARACTERS>;
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

function legacyToCard(legacy: LegacyCard, stage: HeroPathStage): Card {
  return {
    id: `reportage-${stage}-${Date.now()}`,
    title: legacy.title,
    character: legacy.character,
    image: legacy.image || '',
    text: legacy.text,
    leftChoice: {
      text: legacy.leftChoice.text,
      line: legacy.leftChoice.line,
      effects: {
        statEffect: legacy.leftChoice.effect
      }
    },
    rightChoice: {
      text: legacy.rightChoice.text,
      line: legacy.rightChoice.line,
      effects: {
        statEffect: legacy.rightChoice.effect
      }
    }
  };
}

function getMockCard(stage: HeroPathStage): Card {
  const scenarios = REPORTAGE_SCENARIOS[stage];
  const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];

  return legacyToCard(randomScenario, stage);
}
