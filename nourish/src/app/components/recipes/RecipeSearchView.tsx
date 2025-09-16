'use client'
import { SAMPLE_RECIPES } from "@/lib/FakeData";
import RecipeSearchBar from "./RecipeSearchBar";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import { useQueryGetRecipes } from "@/lib/hooks/api/recipes";

export default function RecipeSearchView() {
    const { data: dbRecipes } = useQueryGetRecipes()
    const [tagFilters, setTagFilters] = useState<string[]>([]);
    const [filteredRecipesOld, setFilteredRecipes] = useState(SAMPLE_RECIPES);
  return (
    <>
      <RecipeSearchBar setTagFilters={setTagFilters} tagFilters={tagFilters} setFilteredRecipes={setFilteredRecipes} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dbRecipes?.slice(0, 18).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
