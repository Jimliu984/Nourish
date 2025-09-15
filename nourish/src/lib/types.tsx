interface Meal {
  id: string;
  name: string;
  type: MealType;
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
  name: string;
  quantity: string;
};

interface Recipe {
  id: number;
  name: string;
  type: MealType;
  ingredients: Ingredient[];
  instructions: string[];
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  tags: string[];
  isFavorite: boolean;
}

interface DailyMeals {
  breakfast: number[];
  lunch: number[];
  dinner: number[];
}

interface WeekPlan {
  startDate: string;
  monday: DailyMeals;
  tuesday: DailyMeals;
  wednesday: DailyMeals;
  thursday: DailyMeals;
  friday: DailyMeals;
  saturday: DailyMeals;
  sunday: DailyMeals;
}

type MealType = "any" | "breakfast" | "lunch" | "dinner" | "snack" | "dessert";

type Week =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type { Meal, MealType, DayMeals, DailyMeals, RecipeOverview, Recipe, Ingredient, WeekPlan, Week };
