// import { Recipe as DbRecipe } from "@/generated/prisma";
// import { Ingredient, Recipe } from "../types";

// function convertDbRecipeToRecipe({recipe} : {recipe:DbRecipe}){
    // const outRecipe : Recipe = {
    //     id: recipe.id,
    //     name: recipe.name,
    //     type: recipe.mealType,
    //     ingredients: recipe.ingredients
    //         ? JSON.parse(recipe.ingredients)[]
    //         : [],
    //     instructions: recipe.instructions
    //         ? JSON.parse(recipe.instructions)
    //         : [],
    //     cookTime: recipe.cookTime,
    //     servings: recipe.servings,
    //     difficulty: recipe.difficulty,
    //     description: recipe.description,
    //     tags: recipe.tags ? JSON.parse(recipe.tags) : [],
    //     isFavorite: recipe.isFavourite,
    // }
    // return outRecipe;
// }

// function convertIngredientToJson({ingredients} : {ingredients:Ingredient[]}) {
//     const jsonObj = {};
//     ingredients.map((ing) => {
//         jsonObj[ing.name] = ing.quantity
//     })
// }