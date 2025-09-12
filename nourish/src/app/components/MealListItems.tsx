import { Button } from "@/components/ui/button";
import { Meal } from "@/lib/types";

interface MealListItemsProps {
  meals: Meal[];
  day: string;
  mealType: string;
  removeMeal: (day: string, mealType: string, mealId: string) => void;
}
export default function MealListItems({
  meals,
  removeMeal,
  day,
  mealType,
}: MealListItemsProps) {
  return (
    <div className="space-y-2">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="group flex items-center justify-between bg-recipe-card p-3 rounded-lg border border-border/20 transition-all hover:shadow-sm hover:border-border/40"
        >
          <span className="text-sm font-medium text-foreground">{meal.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeMeal(day, mealType, meal.id)}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          >
            ×
          </Button>
        </div>
      ))}
    </div>
  );
}
