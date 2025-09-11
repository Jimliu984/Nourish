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

interface Recipe {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  isFavorite: boolean;
}

export type { Meal, DayMeals, RecipeOverview, Recipe };
