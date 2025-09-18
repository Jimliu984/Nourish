import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ChefHat, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { WeekPlan } from "@/lib/types";
import {
  extractAllIngredientsFromWeekPlan,
  extractIngredientsPerRecipeFromWeekPlan,
} from "@/lib/helpers/recipeHelper";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function ShoppingListDialog({
  weekPlan,
}: {
  weekPlan: WeekPlan;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"combined" | "by-recipe">(
    "combined"
  );
  const allIngredients = extractAllIngredientsFromWeekPlan(weekPlan);
  const individualRecipes = extractIngredientsPerRecipeFromWeekPlan(weekPlan);
  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }
  return (
    <Dialog open={isOpen} onOpenChange={() => handleOpenChange(!isOpen)}>
      <DialogTrigger className="flex items-center bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md px-4 gap-2 py-2 text-sm font-medium">
        <ShoppingCart className="h-4 w-4" />
        <span>Shopping List</span>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[45vh] md:min-w-[90vh] overflow-y-auto">
        <DialogTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Weekly Shopping List
        </DialogTitle>
        <DialogDescription>
          Your ingredients organized by preference
        </DialogDescription>
        <Tabs
          value={viewMode}
          onValueChange={(value) =>
            setViewMode(value as "combined" | "by-recipe")
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combined">Combined List</TabsTrigger>
            <TabsTrigger value="by-recipe">By Recipe</TabsTrigger>
          </TabsList>
          <TabsContent value="combined" className="mt-4">
            <div className="flex flex-col space-y-2">
              {allIngredients.size > 0 ? (
                allIngredients
                  .keys()
                  .toArray()
                  .map((ing, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50"
                    >
                      <span className="font-medium text-foreground">{ing}</span>
                      <div className="flex justify-end space-x-0.5">
                        {allIngredients.get(ing)?.map((quant, index) => (
                          <Badge key={index} variant="secondary">
                            {quant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="max-h-[400px]">
                  No meals planned this week!
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="by-recipe" className="mt-4 space-y-2">
            {individualRecipes.size > 0 ? (
              individualRecipes
                .keys()
                .toArray()
                .map((recipe) => (
                  <Card key={recipe.name} className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <ChefHat className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-foreground">
                          {recipe.name}
                        </h3>
                      </div>
                      <Badge className="justify-end" variant="secondary">
                        {individualRecipes.get(recipe)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {recipe.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground pl-6 flex"
                        >
                          <span className="text-sm">
                            •{" "}
                            <span className="font-bold text-foreground">
                              {ingredient.quantity}
                            </span>{" "}
                            {ingredient.name}
                          </span>
                          {/*  <p className="font-bold">{ingredient.quantity}</p> <p>{"  "}</p> <p>{ingredient.name}</p> */}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))
            ) : (
              <div className="max-h-[400px]">
                No recipes added this week!
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
