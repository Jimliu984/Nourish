"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Tag, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function RecipeSearchBar({
  setTagFilters,
  setSearchFilter,
  selectedTags,
  searchFilter,
  suggestedTags,
}: {
  setTagFilters: Dispatch<SetStateAction<string[]>>;
  setSearchFilter: Dispatch<SetStateAction<string>>;
  selectedTags: string[];
  searchFilter: string;
  suggestedTags: string[];
}) {
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  function addTagFromSearch(tag: string) {
    setTagFilters((prev) => {
      if (!prev.includes(tag)) {
        return [...prev, tag];
      }
      return [];
    });
    setSearchFilter("");
    setShowTagSuggestions(false);
  };
  function removeTag(tag: string) {
    setTagFilters((prev) => {
      return prev.filter((t) => t !== tag);
    });
  }
  return (
    <Card className="p-6 bg-card border-border/50 w-full">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes, ingredients, or descriptions..."
            onChange={(e) => {
              setSearchFilter(e.target.value.toLowerCase());
              setShowTagSuggestions(e.target.value.trim().length > 0);
            }}
            value={searchFilter}
            className="pl-10"
          />
          {showTagSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-[200px] overflow-y-auto">
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

        {/* <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Meal Type:
          </span>
          {mealTypes.map((type) => (
            <RecipeFilterChip
              name={type}
              initialState={selectedMealTypes.includes(type)}
              chipSelectedFilterHandler={(type) => {
                if (type === "all") {
                   setSelectedMealTypes(["all"]);
                } else {
                  if (selectedMealTypes.length === 1 && selectedMealTypes[0] === "all") {
                    setSelectedMealTypes([type])
                  } else {
                    // if ()
                    setSelectedMealTypes([...selectedMealTypes, type])
                  }
                }
                // let newFilters : string[] = [];
                // if (selectedMealTypes.includes(type)) {
                //   newFilters = selectedMealTypes.filter((tag) => tag !== type);
                // } else {
                //   newFilters = selectedMealTypes.push(type)
                // }
                // const newFilters = selectedMealTypes.filter((tag) => tag !== type);
                // setSelectedMealType(type);
              }}
            />
            // <Badge
            //   key={type}
            //   // variant={selectedType === type ? "default" : "outline"}
            //   className="cursor-pointer hover:bg-primary/20 capitalize"
            //   onClick={() => setSelectedMealType(type)}
            // >
            //   {type}
            // </Badge>
          ))}
        </div> */}

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
          {/* <RecipeFilterChip name="healthy" initialState={false} /> */}
        </div>
      </div>
    </Card>
  );
}
