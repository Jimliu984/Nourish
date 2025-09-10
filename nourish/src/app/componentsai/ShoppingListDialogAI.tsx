import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ShoppingCart, ChefHat } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients?: string[];
}

interface ShoppingListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  weekMeals: { [key: string]: Meal[] };
}

export const ShoppingListDialog: React.FC<ShoppingListDialogProps> = ({
  isOpen,
  onClose,
  weekMeals
}) => {
  const [viewMode, setViewMode] = useState<'combined' | 'by-recipe'>('combined');

  // Generate combined shopping list
  const generateCombinedList = () => {
    const allIngredients: { [key: string]: number } = {};
    
    Object.values(weekMeals).flat().forEach(meal => {
      meal.ingredients?.forEach(ingredient => {
        allIngredients[ingredient] = (allIngredients[ingredient] || 0) + 1;
      });
    });

    return Object.entries(allIngredients).map(([ingredient, count]) => ({
      ingredient,
      count
    }));
  };

  // Generate recipe-based shopping list
  const generateByRecipeList = () => {
    const recipeGroups: { [key: string]: string[] } = {};
    
    Object.values(weekMeals).flat().forEach(meal => {
      if (meal.ingredients && meal.ingredients.length > 0) {
        recipeGroups[meal.name] = meal.ingredients;
      }
    });

    return recipeGroups;
  };

  const combinedList = generateCombinedList();
  const byRecipeList = generateByRecipeList();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Weekly Shopping List
          </DialogTitle>
          <DialogDescription>
            Your ingredients organized by preference
          </DialogDescription>
        </DialogHeader>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'combined' | 'by-recipe')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combined">Combined List</TabsTrigger>
            <TabsTrigger value="by-recipe">By Recipe</TabsTrigger>
          </TabsList>

          <TabsContent value="combined" className="mt-4 max-h-[50vh] overflow-y-auto">
            {combinedList.length > 0 ? (
              <div className="space-y-2">
                {combinedList.map(({ ingredient, count }) => (
                  <div key={ingredient} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50">
                    <span className="font-medium text-foreground">{ingredient}</span>
                    <Badge variant="secondary">{count}x</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No meals planned yet!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="by-recipe" className="mt-4 max-h-[50vh] overflow-y-auto">
            {Object.keys(byRecipeList).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(byRecipeList).map(([recipeName, ingredients]) => (
                  <Card key={recipeName} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ChefHat className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">{recipeName}</h3>
                    </div>
                    <div className="space-y-1">
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="text-sm text-muted-foreground pl-6">
                          • {ingredient}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ChefHat className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No recipes with ingredients yet!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};