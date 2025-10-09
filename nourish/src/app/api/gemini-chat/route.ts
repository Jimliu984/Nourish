import { AI_TOOLS } from "@/lib/helpers/ai/tools";
import { ALL_TAGS } from "@/lib/tags";
import { AiMessage, Recipe } from "@/lib/types";
import { Recipe as RecipeDb } from "@/generated/prisma";
import {
  Content,
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
  const { prompt, history } = await req.json();
  const historyParts : Content[] = history.map((msg: AiMessage) => ({ role: msg.role, parts: [{ text: msg.content }] }));
  // console.log(historyParts);
  const chat = model.startChat({history: historyParts });

  const resp1 = await chat.sendMessage(prompt);
  const candidate = resp1.response.candidates?.[0];
  const part = candidate?.content.parts[0];
  if (part?.functionCall) {
    console.log("Using tool:", part.functionCall.name);
    const { name, args } = part.functionCall;

    const toolResult = await UseTool(name, args);
    if (toolResult.navigateToRecipe) {
      console.log("Navigating to", toolResult.navigateToRecipe);
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_ROOT_URL}/recipes${toolResult.navigateToRecipe}`));
    }
    // console.log(toolResult)

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
  console.log("No tool used");
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

async function UseTool(name: string, args: any) {
    switch (name) {
        case "getAllTags":
            return { allTags: ALL_TAGS };
        case "getAllRecipes":
            return { allRecipes: await fetchAllRecipes() };
        case "getFavoriteRecipes":
            return { allRecipes: (await fetchAllRecipes()).filter((recipe) => recipe.isFavorite) };
        case "getFilteredRecipesByTags":
            const { tags } = args as { tags: string[] };
            console.log("Getting recipes by tags", tags);
            return { allRecipes: (await fetchAllRecipes()).filter((recipe) => recipe.tags.some((tag) => tags.includes(tag))) };
        case "getFilteredRecipeById":
            const { recipeId } = args as { recipeId: number };
            console.log("Getting recipe by ID", recipeId);
            const allRecipes = await fetchAllRecipes();
            return { recipe: allRecipes.find((recipe) => recipe.id === recipeId) ?? null };
        case "getFilteredRecipeByName":
            const { recipeName } = args as { recipeName: string };
            console.log("Getting recipe by name", recipeName);
            const allRecipes2 = await fetchAllRecipes();
            return { recipe: allRecipes2.find((recipe) => recipe.name.toLowerCase() === recipeName.toLowerCase()) ?? null };
        case "navigateToRecipe":
            const { recipeNameToNavigate } = args as { recipeNameToNavigate: string };
            console.log("Getting recipe to navigate to", recipeNameToNavigate);
            const allRecipes3 = await fetchAllRecipes();
            const recipe = allRecipes3.find((recipe) => recipe.name.toLowerCase() === recipeNameToNavigate.toLowerCase());
            if (recipe) {
                const urlName = `/${recipe.id}-${recipe.name.toLowerCase().split(" ").join("-")}`;
                return { navigateToRecipe: urlName};
            }
            return { navigateToRecipe: "/"};
            
        default:
            return {};
    }
}