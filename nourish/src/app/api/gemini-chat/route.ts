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
  const historyParts: Content[] = history.map((msg: AiMessage) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));
  // console.log(historyParts);
  const chat = model.startChat({ history: historyParts });

  const resp1 = await chat.sendMessage(prompt);
  const candidate = resp1.response.candidates?.[0];
  const part = candidate?.content.parts[0];
  if (part?.functionCall) {
    console.log("Using tool:", part.functionCall.name);
    const { name, args } = part.functionCall;

    const toolResult = await UseTool(name, args);
    if (toolResult.navigateToRecipe) {
      console.log("Navigating to", toolResult.navigateToRecipe);
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_ROOT_URL}/recipes${toolResult.navigateToRecipe}`
        )
      );
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/api/recipes`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const recipes = (await response.json()) as RecipeDb[];
  const stuff = recipes.map((recipe) =>
    convertDbRecipeToUiRecipe(recipe)
  ) as Recipe[];
  return stuff;
}

async function UseTool(name: string, args: any) {
  let allRecipes: Recipe[] = [];
  switch (name) {
    case "getAllTags":
      return { allTags: ALL_TAGS };
    case "getAllRecipes":
      return { allRecipes: await fetchAllRecipes() };
    case "getFavoriteRecipes":
      return {
        allRecipes: (await fetchAllRecipes()).filter(
          (recipe) => recipe.isFavorite
        ),
      };
    case "getFilteredRecipesByTags":
      const { tags } = args as { tags: string[] };
      console.log("Getting recipes by tags", tags);
      return {
        allRecipes: (await fetchAllRecipes()).filter((recipe) =>
          recipe.tags.some((tag) => tags.includes(tag.toLowerCase()))
        ),
      };
    case "getFilteredRecipesByIngredients":
      const { ingredients } = args as { ingredients: string[] };
      console.log("Getting recipes by ingredients", ingredients);
      return {
        allRecipes: (await fetchAllRecipes()).filter((recipe) =>
          recipe.ingredients.some((ing) =>
            ingredients.includes(ing.name.toLowerCase())
          )
        ),
      };
    case "getFilteredRecipeById":
      const { recipeId } = args as { recipeId: number };
      console.log("Getting recipe by ID", recipeId);
      allRecipes = await fetchAllRecipes();
      return {
        recipe: allRecipes.find((recipe) => recipe.id === recipeId) ?? null,
      };
    case "getFilteredRecipeByName":
      const { recipeName } = args as { recipeName: string };
      console.log("Getting recipe by name", recipeName);
      allRecipes = await fetchAllRecipes();
      return {
        recipe:
          allRecipes.find(
            (recipe) => recipe.name.toLowerCase() === recipeName.toLowerCase()
          ) ?? null,
      };
    case "getRecipeIngredients":
      const { recipeName: recipeNameForIngs } = args as { recipeName: string };
      console.log("Getting recipe ingredients by name", recipeNameForIngs);
      allRecipes = await fetchAllRecipes();
      return {
        ingredients:
          allRecipes.find(
            (recipe) =>
              recipe.name.toLowerCase() === recipeNameForIngs.toLowerCase()
          )?.ingredients ?? [],
      };
    case "getRecipeInstructions":
      const { recipeName: recipeNameForInstructions } = args as {
        recipeName: string;
      };
      console.log(
        "Getting recipe instructions by name",
        recipeNameForInstructions
      );
      allRecipes = await fetchAllRecipes();
      return {
        instructions:
          allRecipes.find(
            (recipe) =>
              recipe.name.toLowerCase() ===
              recipeNameForInstructions.toLowerCase()
          )?.instructions ?? [],
      };
    case "getRecipeTags":
      const { recipeName: recipeNameForTags } = args as { recipeName: string };
      console.log("Getting recipe tags by name", recipeNameForTags);
      allRecipes = await fetchAllRecipes();
      return {
        tags:
          allRecipes.find(
            (recipe) =>
              recipe.name.toLowerCase() === recipeNameForTags.toLowerCase()
          )?.tags ?? [],
      };
    case "getRecipeDescription":
      const { recipeName: recipeNameForDescription } = args as {
        recipeName: string;
      };
      console.log(
        "Getting recipe description by name",
        recipeNameForDescription
      );
      allRecipes = await fetchAllRecipes();
      return {
        description:
          allRecipes.find(
            (recipe) =>
              recipe.name.toLowerCase() ===
              recipeNameForDescription.toLowerCase()
          )?.description ?? "",
      };
    case "navigateToRecipe":
      const { recipeNameToNavigate } = args as { recipeNameToNavigate: string };
      console.log("Getting recipe to navigate to", recipeNameToNavigate);
      allRecipes = await fetchAllRecipes();
      const recipe = allRecipes.find(
        (recipe) =>
          recipe.name.toLowerCase() === recipeNameToNavigate.toLowerCase()
      );
      if (recipe) {
        const urlName = `/${recipe.id}-${recipe.name
          .toLowerCase()
          .split(" ")
          .join("-")}`;
        return { navigateToRecipe: urlName };
      }
      return { navigateToRecipe: "/" };

    default:
      return {};
  }
}
