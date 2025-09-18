import { Recipe as RecipeDb } from "@/generated/prisma";
import { Recipe } from "@/lib/types";
import { Ingredient, RecipeFormValues } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NextResponse } from "next/server";

// const basePath = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/accounts`;

function useQueryGetRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await fetch("/api/recipes", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const recipes = (await response.json()) as RecipeDb[];
      const stuff = recipes.map((recipe) =>
        convertDbRecipeToUiRecipe(recipe)
      ) as Recipe[];
      return stuff;
    },
  });
}

function useQueryGetRecipeById(id: number) {
  return useQuery({
    queryKey: ["recipes", id],
    queryFn: async () => {
      const response = await fetch(`/api/recipes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const recipe = (await response.json()) as RecipeDb;
      return convertDbRecipeToUiRecipe(recipe);
    },
    refetchOnMount: false,
  });
}

function useMutationCreateRecipe() {
  return useMutation({
    mutationFn: async (data: RecipeFormValues) => {
      const ingredients = arrayToIngredientObject(data.ingredients);
      const instructions = arrayToInstructionObject(data.instructions);
      const submitObj = {
        name: data.name,
        tags: data.tags.join(","),
        mealType: data.type,
        cookTime: data.cookTime,
        description: data.description,
        difficulty: data.difficulty,
        servings: data.servings,
        ingredients: JSON.stringify(ingredients),
        instructions: JSON.stringify(instructions),
        isFavorite: data.isFavorite,
      };
      const response = await fetch("/api/recipes", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(submitObj),
      });
      return NextResponse.json(response);
    },
  });
}

function useMutationUpdateRecipe() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      let submitObj : any = {}
      if (data.ingredients) {
        submitObj.ingredients = JSON.stringify(arrayToIngredientObject(data.ingredients));
      }
      if (data.instructions) {
        submitObj.instructions = JSON.stringify(arrayToInstructionObject(data.instructions));
      }
      if (data.tags) {
        submitObj.tags = data.tags.join(",");
      }
      submitObj.id = id;
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const { ingredients, instructions, tags, ...rest } = data;
      submitObj = {...submitObj, ...rest}
      const response = await fetch(`/api/recipes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(submitObj),
      });
      return NextResponse.json(response);
    },
  });
}

// HELPERS

function convertDbRecipeToUiRecipe(recipe: RecipeDb) {
  try {
    return {
      id: recipe.id,
      name: recipe.name,
      tags: recipe.tags.split(","),
      type: recipe.mealType,
      cookTime: recipe.cookTime,
      description: recipe.description,
      difficulty: recipe.difficulty,
      servings: recipe.servings,
      ingredients: ingredientObjectToArray(JSON.parse(recipe.ingredients)),
      instructions: instructionObjectToArray(JSON.parse(recipe.instructions)),
      isFavorite: recipe.isFavorite,
    } as Recipe;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function arrayToIngredientObject(arr: Ingredient[]): Record<string, string> {
  return arr.reduce((obj, ing) => {
    obj[ing.name] = ing.quantity;
    return obj;
  }, {} as Record<string, string>);
}
function arrayToInstructionObject(arr: string[]): Record<number, string> {
  return arr.reduce((obj, instr, index) => {
    obj[index + 1] = instr;
    return obj;
  }, {} as Record<number, string>);
}
function ingredientObjectToArray(
  ingredients: Record<string, string>
): Ingredient[] {
  const destructure = Object.keys(ingredients).map((key) => [
    key,
    ingredients[key],
  ]);
  return destructure.map((values) => {
    return { name: values[0], quantity: values[1] };
  });
}
function instructionObjectToArray(
  instructions: Record<number, string>
): string[] {
  return Object.keys(instructions)
    .map((key) => [Number.parseInt(key), instructions[Number.parseInt(key)]])
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([, value]) => value.toString());
}

export {
  useMutationCreateRecipe,
  useMutationUpdateRecipe,
  useQueryGetRecipes,
  useQueryGetRecipeById,
};
