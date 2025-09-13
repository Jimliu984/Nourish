import { Recipe } from "@/generated/prisma";
import { useMutation, useQuery } from "@tanstack/react-query";

// const basePath = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/accounts`;

type RecipePost = {
  name: string;
  mealType: "any" | "breakfast" | "lunch" | "dinner" | "snack";
  ingredients: string;
  instructions: string; // json instructions
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  tags: string[];
  isFavorite: boolean;
}

function useQueryGetRecipes() {
    return useQuery({
        queryKey: ["recipes"],
        queryFn: async () => {
            const response = await fetch("/api/recipes", {
                headers: {
                "Content-Type": "application/json",
                },
            });
            const recipe = (await response.json()) as Recipe;
            return recipe;
        },
        refetchOnMount: false,
    })
}

function useQueryGetByIdRecipes(id : number) {
    return useQuery({
        queryKey: ["recipes", id],
        queryFn: async () => {
            const response = await fetch(`/api/recipes?id=${id}`, {
                headers: {
                "Content-Type": "application/json",
                },
            });
            const recipe = (await response.json()) as Recipe;
            return recipe;
        },
        refetchOnMount: false,
    })
}

function useMutationPostRecipes() {
    return useMutation({
        mutationFn: async (data : RecipePost) => {
            // const ingredients = data.ingredients.map((ing) => {

            // })
            const response = await fetch("/api/recipes", {
                headers: {
                "Content-Type": "application/json",
                },
                method : "POST",
                body : JSON.stringify({
                    ...data,
                    tags : data.tags.join(",")
                })
            })
        }
    })
}

export {useMutationPostRecipes, useQueryGetRecipes, useQueryGetByIdRecipes}