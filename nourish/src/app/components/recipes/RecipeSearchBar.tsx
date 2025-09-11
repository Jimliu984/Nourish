"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function RecipeSearchBar() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const mealTypes = ["all", "breakfast", "lunch", "dinner", "snack"];
  const availableTags = [
    "Quick",
    "Healthy",
    "Vegetarian",
    "High Protein",
    "Spicy",
    "Mediterranean",
    "Asian",
    "Make-ahead",
    "Gluten-free",
  ];
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
            //   onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Tags:
          </span>
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
