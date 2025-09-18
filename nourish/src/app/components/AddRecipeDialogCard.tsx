import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ingredient } from "@/lib/types";
import { Clock, Users } from "lucide-react";
import React from "react";

type RecipeDialogCardProps = {
  title: string;
  prepTime: number;
  servings: number;
  ingredients: Ingredient[];
  addRecipe: () => void;
};

export default function AddRecipeDialogCard({
  title,
  prepTime,
  servings,
  ingredients,
  addRecipe,
} : RecipeDialogCardProps) {

  return (
    <div className="p-4 bg-recipe-card border border-border/30 rounded-lg hover:bg-recipe-hover transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-2">{title}</h4>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {prepTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {servings} servings
            </div>
          </div>

          {ingredients && (
            <div className="flex flex-wrap gap-1">
              {ingredients.slice(0, 4).map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ingredient.name}
                </Badge>
              ))}
              {ingredients.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{ingredients.length - 4} more
                </Badge>
              )}
            </div>
          )}
        </div>

        <Button
          variant="recipe"
          size="sm"
          onClick={() => addRecipe()}
          className="ml-4"
        >
          Add
        </Button>
      </div>
    </div>
  );
};