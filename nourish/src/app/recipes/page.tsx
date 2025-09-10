import { ChefHat } from "lucide-react";
import RecipeSearchBar from "../components/recipes/RecipeSearchBar";

export default function RecipesPage() {
  return (
    <div className="flex flex-col items-center min-w-screen justify-center px-30 py-6 space-x-2">
      <div className="flex min-w-full">
        <ChefHat className="h-8 w-8 text-primary justify-start" />
        <h1 className="text-3xl justify-start flex flex-1 font-bold text-foreground">
          Recipes
        </h1>
     </div>
     <RecipeSearchBar />
    </div>
  );
}
