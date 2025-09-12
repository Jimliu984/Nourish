interface Meal {
  id: string;
  name: string;
  type: 'any' | "breakfast" | "lunch" | "dinner" | "snack";
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

type Ingredient = {
  name : string;
  quantity : string;
}

interface Recipe {
  id: number;
  name: string;
  type: 'any' | 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: Ingredient[];
  instructions: string[];
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  isFavorite: boolean;
}

export type { Meal, DayMeals, RecipeOverview, Recipe, Ingredient};
