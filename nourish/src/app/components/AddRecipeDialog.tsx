import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import RecipeTag from "./RecipeTag";
import AddRecipeDialogCard from "./AddRecipeDialogCard";
import { SAMPLE_RECIPES } from "@/lib/FakeData";
import { Recipe, Week } from "@/lib/types";

interface AddRecipeDialogProps {
  mealTime: "breakfast" | "lunch" | "dinner";
  day: Week;
  addRecipe: (
    recipeId: number,
    mealTime: "breakfast" | "lunch" | "dinner",
    day: Week
  ) => void;
  children: React.ReactNode;
}
const availableTags = [
  "Quick",
  "Healthy",
  "Vegetarian",
  "High Protein",
  "Low Carb",
];

export default function AddRecipeDialog({
  mealTime,
  day,
  addRecipe,
  children,
}: AddRecipeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(
    SAMPLE_RECIPES.filter((rec) => rec.type === mealTime)
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[45vh] md:min-w-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add Recipe {mealTime && `for ${mealTime}`}
          </DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes or ingredients..."
            onChange={(e) => {
              const filterValue = e.target.value.toLowerCase();
              const filtered = SAMPLE_RECIPES.filter((recipe) => {
                return (
                  recipe.name.toLowerCase().includes(filterValue) ||
                  recipe.ingredients.find((ing) =>
                    ing.name.toLowerCase().includes(filterValue)
                  ) ||
                  recipe.tags.find((tag) =>
                    tag.toLowerCase().includes(filterValue)
                  )
                );
              });
              setFilteredRecipes(filtered);
            }}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <RecipeTag
              tagName={tag}
              toggleTag={toggleTag}
              selectedTags={selectedTags}
              key={tag}
            />
          ))}
        </div>
        {filteredRecipes.slice(0, 5).map((recipe) => (
          <AddRecipeDialogCard
            key={recipe.id}
            recipeId={recipe.id}
            mealTime={mealTime}
            day={day}
            addRecipe={() => { 
              addRecipe(recipe.id, mealTime, day);
              handleOpenChange(false);
             }}
            title={recipe.name}
            servings={recipe.servings}
            prepTime={recipe.cookTime}
            ingredients={recipe.ingredients}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}
