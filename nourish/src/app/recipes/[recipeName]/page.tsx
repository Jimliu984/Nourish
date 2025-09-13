import FavouriteButton from "@/app/components/recipes/FavouriteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DIFFICULTY_COLORS } from "@/lib/Constants";
import { SAMPLE_RECIPES } from "@/lib/FakeData";
import { Ingredient } from "@/lib/types";
import { ChefHat, Clock, Users } from "lucide-react";

export default async function ViewRecipePage({
  params,
}: {
  params: Promise<{ recipeName: string }>;
}) {
  const { recipeName } = await params;
  const recipe = SAMPLE_RECIPES[Number.parseInt(recipeName.split("-")[0])-1];
  // API call to get Recipe by name here, or pass recipe through since recipe info already rendered on previous page
  return (
    <div className="flex flex-col items-start min-w-screen justify-center px-30 py-6 space-x-2 space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
        <div className="flex">
        <h1 className="text-3xl justify-start flex flex-1 font-bold text-foreground">
          {recipe.name}
        </h1>
        </div>
        <div className="justify-end flex">
            <FavouriteButton isFavorite={recipe.isFavorite} />
            <Button>Add</Button>
          <Button>Add</Button>
        </div>
      </div>
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{recipe.cookTime} mins</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex items-center gap-1">
          <ChefHat className="h-4 w-4" />
          <Badge className={DIFFICULTY_COLORS[recipe.difficulty]}>
            {recipe.difficulty}
          </Badge>
        </div>
      </div>

      <Tags tags={recipe.tags} />

      <div className="w-full space-y-4">
        <div className="grid lg:grid-cols-2 gap-6">
          <IngredientsSection ingredients={recipe.ingredients} />

          <RecipeDetails
            cookTime={recipe.cookTime}
            difficulty={recipe.difficulty}
            type={recipe.type}
            servings={recipe.servings}
          />
        </div>

        <InstructionsSection instructions={recipe.instructions} />

        {recipe.description && (
          <DescriptionSection description={recipe.description} />
        )}
      </div>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    )
  );
}

function IngredientsSection({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-sm">
                <span className="font-medium text-foreground">
                  {ingredient.quantity}
                </span>{" "}
                {ingredient.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function RecipeDetails({
  type,
  cookTime,
  servings,
  difficulty,
}: {
  type: "any" | "breakfast" | "lunch" | "dinner" | "snack" | "dessert";
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Recipe Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Meal Type</h4>
          <Badge variant="outline" className="capitalize">
            {type}
          </Badge>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground">
              Cook Time
            </h4>
            <p className="text-lg font-semibold">{cookTime} mins</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground">
              Servings
            </h4>
            <p className="text-lg font-semibold">{servings}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium text-sm text-muted-foreground">
            Difficulty
          </h4>
          <Badge className={DIFFICULTY_COLORS[difficulty]}>{difficulty}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function InstructionsSection({ instructions }: { instructions: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed pt-1">{instruction}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function DescriptionSection({ description }: { description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
