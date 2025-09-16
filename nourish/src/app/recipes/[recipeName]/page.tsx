import RecipePageView from "@/app/components/recipes/RecipePageView";

export default async function ViewRecipePage({
  params,
}: {
  params: Promise<{ recipeName: string }>;
}) {
  const { recipeName } = await params;
  return <RecipePageView recipeName={recipeName} />;
}
