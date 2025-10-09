import { Recipe as RecipeDb } from "@/generated/prisma";
import { Recipe } from "@/lib/types";
import { Ingredient } from "@/lib/types";

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
  convertDbRecipeToUiRecipe,
  arrayToIngredientObject,
  arrayToInstructionObject,
};
