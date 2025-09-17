"use client";
import RecipeSearchBar from "./RecipeSearchBar";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import { useQueryGetRecipes } from "@/lib/hooks/api/recipes";
import { ALL_TAGS } from "@/lib/tags";

export default function RecipeSearchView() {
  const { data: dbRecipes } = useQueryGetRecipes();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const suggestedTags = ALL_TAGS.filter(tag => 
    tag.toLowerCase().includes(searchFilter.toLowerCase()) && 
    !tagFilters.includes(tag) &&
    searchFilter.trim().length > 0
  );
  return (
    <>
      <RecipeSearchBar
        setTagFilters={setTagFilters}
        setSearchFilter={setSearchFilter}
        selectedTags={tagFilters}
        searchFilter={searchFilter}
        suggestedTags={suggestedTags}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
        {dbRecipes
          ?.slice(0, 18)
          .map(
            (recipe) =>
              (((!!searchFilter && recipe.name.toLowerCase().includes(searchFilter)) ||
                (!!searchFilter && recipe.ingredients.find((ing) =>
                  ing.name.toLowerCase().startsWith(searchFilter)
                )) ||
                recipe.tags.find((tag) => tagFilters.includes(tag))) || (!searchFilter && tagFilters.length === 0) ) && (
                <RecipeCard key={recipe.id} recipe={recipe} />
              )
          )}
      </div>
    </>
  );
}
