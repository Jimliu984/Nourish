import RecipePageView from "@/app/components/recipes/RecipePageView";
import { SAMPLE_RECIPES } from "@/lib/FakeData";
import { useQueryGetRecipeById } from "@/lib/hooks/api/recipes";

export default async function ViewRecipePage({
  params,
}: {
  params: Promise<{ recipeName: string }>;
}) {
  const { recipeName } = await params;
  // const recipe = SAMPLE_RECIPES[Number.parseInt(recipeName.split("-")[0])-1];
  // API call to get Recipe by name here
  return <RecipePageView recipeName={recipeName} />;
}
