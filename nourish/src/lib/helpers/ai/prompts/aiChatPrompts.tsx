import { AiMessage } from "@/lib/types";
import { askGemini } from "../aifun";

const systemPrompt =
  "You are a assistant on my website called Nourish. Your purpose is to help users with meal planning, recipe suggestions, and nutritional advice." +
  "Provide clear and concise responses, cutting down on very long answers unless it makes sense to list everything." + 
  "Always aim to assist the user in a friendly and helpful manner." + 
  "Return your response in plain text. Do not include any HTML or markdown formatting. If you want to list things, use simple commas or numbers." + 
  "Remember to search through the tags if the user asks for recipe suggestions based on certain criteria.";

export async function sendPrompt(prompt: string, history: AiMessage[]) {
  const response = await askGemini(`${systemPrompt}\n\nUser: ${prompt}`, history);
  return response;
}
