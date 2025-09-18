import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search, Tag, X } from "lucide-react";
import { useState } from "react";
import AddRecipeDialogCard from "./AddRecipeDialogCard";
import { ShoppingListRecipe, Week } from "@/lib/types";
import { useQueryGetRecipes } from "@/lib/hooks/api/recipes";
import { ALL_TAGS } from "@/lib/tags";
import { Badge } from "@/components/ui/badge";

interface AddRecipeDialogProps {
  mealTime: "breakfast" | "lunch" | "dinner";
  day: Week;
  addRecipe: (
    recipe: ShoppingListRecipe,
    mealTime: "breakfast" | "lunch" | "dinner",
    day: Week
  ) => void;
  children: React.ReactNode;
}

export default function AddRecipeDialog({
  mealTime,
  day,
  addRecipe,
  children,
}: AddRecipeDialogProps) {
  const { data: allRecipes } = useQueryGetRecipes();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const suggestedTags = ALL_TAGS.filter(tag => 
    tag.toLowerCase().includes(searchFilter.toLowerCase()) && 
    !selectedTags.includes(tag) &&
    searchFilter.trim().length > 0
  );
  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }
  function addTagFromSearch(tag: string) {
    setSelectedTags((prev) => {
      if (!prev.includes(tag)) {
        return [...prev, tag];
      }
      return [];
    });
    setSearchFilter("");
    setShowTagSuggestions(false);
  };
  function removeTag(tag: string) {
    setSelectedTags((prev) => {
      return prev.filter((t) => t !== tag);
    });
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
              setSearchFilter(e.target.value);
              setShowTagSuggestions(e.target.value.trim().length > 0);
            }}
            className="pl-10"
            value={searchFilter}
          />
        </div>
        <div>
        {showTagSuggestions && (
            <div className="top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-[200px] overflow-y-auto">
              <div className="p-2 border-b bg-muted/50">
                <span className="text-xs text-muted-foreground font-medium">
                  Suggested tags:
                </span>
              </div>
              {suggestedTags.slice(0, 8).map((tag) => (
                <div
                  key={tag}
                  onClick={() => addTagFromSearch(tag)}
                  className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer transition-colors"
                >
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{tag}</span>
                  <Plus className="h-3 w-3 text-muted-foreground ml-auto" />
                </div>
              ))}
              {suggestedTags.length > 8 && (
                <div className="p-2 text-xs text-muted-foreground text-center border-t">
                  +{suggestedTags.length - 8} more tags available
                </div>
              )}
            </div>
          )}
          </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Tags:
          </span>
          {selectedTags.map((tag, index) => {
            return (
              <Badge key={index} variant="secondary" className="pr-1">
                {tag}
                <button
                  onClick={() => {
                    removeTag(tag);
                  }}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
        {allRecipes?.slice(0, 12)
          .map((recipe) =>
              (((!!searchFilter && recipe.name.toLowerCase().includes(searchFilter)) ||
                (!!searchFilter && recipe.ingredients.find((ing) =>
                  ing.name.toLowerCase().startsWith(searchFilter)
                )) ||
                recipe.tags.find((tag) => selectedTags.includes(tag))) || (!searchFilter && selectedTags.length === 0) ) && (
              <AddRecipeDialogCard
            key={recipe.id}
            addRecipe={() => { 
              addRecipe({...recipe}, mealTime, day);
              handleOpenChange(false);
             }}
            title={recipe.name}
            servings={recipe.servings}
            prepTime={recipe.cookTime}
            ingredients={recipe.ingredients}
          />              )
          )}
      </DialogContent>
    </Dialog>
  );
}
