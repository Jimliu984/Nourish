import { Recipe as RecipeDb } from "@/generated/prisma";
import { arrayToIngredientObject, arrayToInstructionObject, convertDbRecipeToUiRecipe } from "@/lib/helpers/database/recipes";
import { Recipe } from "@/lib/types";
import { RecipeFormValues } from "@/lib/types";
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



export {
  useMutationCreateRecipe,
  useMutationUpdateRecipe,
  useQueryGetRecipes,
  useQueryGetRecipeById,
};
