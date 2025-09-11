import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DIFFICULTY_COLORS } from "@/lib/Constants";
import { Recipe } from "@/lib/MealTypes";
import { Clock, Heart, Users } from "lucide-react";

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe } : RecipeCardProps) {
  return (
    <Card
      className="p-6 bg-recipe-card border-border/30 hover:bg-recipe-hover hover:shadow-hover transition-all duration-200"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">
              {recipe.name}
            </h3>
            <Badge variant="outline" className="text-xs capitalize">
              {recipe.type}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            // onClick={() => toggleFavorite(recipe.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Heart
              className={`h-4 w-4 ${recipe.isFavorite ? "fill-current" : ""}`}
            />
          </Button>
        </div>

        {/* Description */}
        {recipe.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {recipe.cookTime} min
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {recipe.servings} servings
          </div>
          <Badge className={`text-xs ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
            {recipe.difficulty}
          </Badge>
        </div>

        {/* Ingredients Preview */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">
            Ingredients:
          </span>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="text-xs">
                {ingredient}
              </Badge>
            ))}
            {recipe.ingredients.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.ingredients.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Button */}
        <Button
          variant="recipe"
          className="w-full"
        //   onClick={() => handleViewRecipe(recipe.id)}
        >
          View Recipe
        </Button>
      </div>
    </Card>
  );
}
