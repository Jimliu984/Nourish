import { ShoppingListRecipe, Week, WeekPlan } from "../types";
const days: Week[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const meals: ("breakfast" | "lunch" | "dinner")[] = [
  "breakfast",
  "lunch",
  "dinner",
];
export function extractAllIngredientsFromWeekPlan(weekPlan: WeekPlan) {
  const allIngredients = new Map<string, string[]>();
  meals.map((mealType) => {
    days.map((day) => {
      const recipes = weekPlan[day][mealType];
      recipes.map((recipe) => {
        recipe.ingredients.map((ing) => {
          allIngredients.set(ing.name, [
            ...(allIngredients.get(ing.name) ?? []),
            ing.quantity,
          ]);
        });
      });
    });
  });

  return allIngredients;
}

export function extractIngredientsPerRecipeFromWeekPlan(weekPlan: WeekPlan) {
  const allIngredients = new Map<number, [ShoppingListRecipe, number]>();
  meals.map((mealType) => {
    days.map((day) => {
      const recipes = weekPlan[day][mealType];
      recipes.map((recipe) => {
        allIngredients.set(recipe.id, [
          recipe,
          (allIngredients.get(recipe.id)?.[1] ?? 0) + 1,
        ]);
      });
    });
  });
  return allIngredients;
}
