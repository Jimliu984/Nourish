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
  let allIngredients = new Map<string, string[]>();
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

export function extractIngredientsPerRecipeFromWeekPlan(weekPlan : WeekPlan) {
  let allIngredients = new Map<ShoppingListRecipe, number>();
  meals.map((mealType) => {
    days.map((day) => {
      const recipes = weekPlan[day][mealType];
      recipes.map((recipe) => {
        allIngredients.set(recipe, (allIngredients.get(recipe) ?? 0) + 1)
      });
    });
  });
return allIngredients;
}
