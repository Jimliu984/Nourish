import { AI_TOOLS } from "@/lib/helpers/ai/tools";
import { ALL_TAGS } from "@/lib/tags";
import { Recipe } from "@/lib/types";
import { Recipe as RecipeDb } from "@/generated/prisma";
import {
  FunctionResponsePart,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { NextResponse } from "next/server";
import { convertDbRecipeToUiRecipe } from "@/lib/helpers/database/recipes";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  tools: AI_TOOLS,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const chat = model.startChat();

  const resp1 = await chat.sendMessage(prompt);
  const candidate = resp1.response.candidates?.[0];
  const part = candidate?.content.parts[0];
  if (part?.functionCall) {
    const { name, args } = part.functionCall;
    let toolResult: any;

    if (name === "getAllTags") {
      toolResult = { allTags: ALL_TAGS };
    } else if (name === "getAllRecipes") {
        toolResult = { allRecipes: await fetchAllRecipes() };
    }

    // Step 3: Send tool result back
    const funcRespPart: FunctionResponsePart = {
      functionResponse: {
        name: name,
        response: { allTags: toolResult },
      },
    };
    const resp2 = await chat.sendMessage([funcRespPart]);
    return NextResponse.json({ text: resp2.response.text() });
  }

  // If no tool was used, just return text
  return NextResponse.json({ text: resp1.response.text() });
}

async function fetchAllRecipes() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/recipes`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const recipes = (await response.json()) as RecipeDb[];
      const stuff = recipes.map((recipe) =>
        convertDbRecipeToUiRecipe(recipe)
      ) as Recipe[];
      return stuff;
}
