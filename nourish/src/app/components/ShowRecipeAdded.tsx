import { Button } from "@/components/ui/button";
import { ChefHat, Plus } from "lucide-react";

interface ShowRecipeAddedProps {
  mealType?: string;
}

export default function ShowRecipeAdded( { mealType }: ShowRecipeAddedProps ) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground capitalize flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
            {mealType}
        </h4>
        <Button
          variant="meal"
          size="sm"
          // onClick={() => setSelectedSlot({ day, mealType })}
          className="h-7 w-7 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      {
        <div className="min-h-[80px] w-100 p-4 bg-meal-slot border border-border/30 rounded-xl transition-colors hover:bg-meal-slot/80">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="flex flex-col items-center gap-2 text-center">
              <ChefHat className="h-4 w-4" />
              <span className="text-xs">Recipe Added!</span>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
