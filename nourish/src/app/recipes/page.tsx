import { ChefHat } from "lucide-react";
import RecipeSearchBar from "../components/recipes/RecipeSearchBar";
import { SAMPLE_RECIPES } from "@/lib/FakeData";
import RecipeCard from "../components/recipes/RecipeCard";
import AddNewRecipeDialog from "../components/recipes/AddNewRecipeDialog";

export default function RecipesPage() {
  return (
    <div className="flex flex-col items-center min-w-screen justify-center px-30 py-6 space-x-2 space-y-6">
      <div className="flex min-w-full space-x-2">
        <ChefHat className="h-8 w-8 text-primary justify-start" />
        <h1 className="text-3xl justify-start flex flex-1 font-bold text-foreground">
          Recipes
        </h1>
        <AddNewRecipeDialog />
     </div>
     <RecipeSearchBar />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {SAMPLE_RECIPES.slice(0,18).map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      </div>
    </div>
  );
}
