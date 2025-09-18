import { Button } from "@/components/ui/button";
import { Week } from "@/lib/types";

interface MealListItemsProps {
  recipeName: string;
  day: Week;
  mealType: "breakfast" | "lunch" | "dinner";
  removeMeal: (day: Week, mealType: "breakfast" | "lunch" | "dinner", recipeName: string) => void;
}
export default function MealListItem({
  recipeName,
  removeMeal,
  day,
  mealType,
}: MealListItemsProps) {
  return (
    <div
      className="group flex items-center justify-between bg-recipe-card p-3 rounded-lg border border-border/20 transition-all hover:shadow-sm hover:border-border/40 w-full"
    >
      <span className="text-sm font-medium text-foreground">{recipeName}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeMeal(day, mealType, recipeName)}
        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
      >
        ×
      </Button>
    </div>
  );
}
