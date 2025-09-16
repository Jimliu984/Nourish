"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SAMPLE_RECIPES } from "@/lib/FakeData";
import { Recipe } from "@/lib/types";
import { Search } from "lucide-react";
import { useState } from "react";
import { ALL_TAGS } from "@/lib/tags";
import { Button } from "@/components/ui/button";

export default function RecipeSearchBar({ setTagFilters, tagFilters, setFilteredRecipes } : { setTagFilters : (tags: string[]) => void , tagFilters : string[], setFilteredRecipes : (recipes: Recipe[]) => void }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const mealTypes = ["all", "breakfast", "lunch", "dinner", "snack"];
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  return (
    <Card className="p-6 bg-card border-border/50 w-full">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes, ingredients, or descriptions..."
            //   value={searchTerm}
            onChange={(e) => {
              const filterValue = e.target.value.toLowerCase();
              const filtered = SAMPLE_RECIPES.filter((recipe) => {
                return (
                  recipe.name.toLowerCase().includes(filterValue) ||
                  recipe.ingredients.find((ing) =>
                    ing.name.toLowerCase().includes(filterValue)
                  ) ||
                  recipe.tags.find((tag) =>
                    tagFilters.includes(tag)
                  )
                );
              });
              setFilteredRecipes(filtered);
            }}
            className="pl-10"
          />
          {/* <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-md bg-muted/30">
            {ALL_TAGS.filter((tag) => {
              return tagFilters.includes(tag)
            }).slice(0,7).map((tag) => (
              <Button
                key={tag}
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
              >
                {tag}
              </Button>
            ))}
          </div> */}
        </div>

        {/* Meal Type Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Meal Type:
          </span>
          {mealTypes.map((type) => (
            <Badge
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20 capitalize"
              onClick={() => setSelectedType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Tags:
          </span>
          <Badge
            variant={true ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20"
            onClick={() => toggleTag("healthy")}
          >
            healthy
          </Badge>
        </div>
      </div>
    </Card>
  );
}
