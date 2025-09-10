interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  ingredients?: string[];
}

interface DayMeals {
  [key: string]: Meal[];
}

interface RecipeOverview {
  id: number;
  name: string;
  type: string;
  ingredients: string[];
  cookTime: number;
  servings: number;
}

export type { Meal, DayMeals, RecipeOverview };
