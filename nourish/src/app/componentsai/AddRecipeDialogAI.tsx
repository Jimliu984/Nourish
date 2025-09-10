import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Users, Plus } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients?: string[];
  cookTime?: string;
  servings?: string;
}

interface AddRecipeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (meal: Meal) => void;
  mealType?: string;
}

// Sample recipes data
const SAMPLE_RECIPES: Meal[] = [
  {
    id: '1',
    name: 'Overnight Oats',
    type: 'breakfast',
    ingredients: ['Oats', 'Milk', 'Chia seeds', 'Honey', 'Berries'],
    cookTime: '5 min prep',
    servings: '1 serving'
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    type: 'lunch',
    ingredients: ['Chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil'],
    cookTime: '20 min',
    servings: '2 servings'
  },
  {
    id: '3',
    name: 'Salmon with Quinoa',
    type: 'dinner',
    ingredients: ['Salmon fillet', 'Quinoa', 'Broccoli', 'Lemon', 'Garlic'],
    cookTime: '25 min',
    servings: '2 servings'
  },
  {
    id: '4',
    name: 'Greek Yogurt Parfait',
    type: 'breakfast',
    ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Honey'],
    cookTime: '2 min',
    servings: '1 serving'
  },
  {
    id: '5',
    name: 'Turkey & Avocado Wrap',
    type: 'lunch',
    ingredients: ['Turkey slices', 'Avocado', 'Spinach', 'Tomato', 'Whole wheat tortilla'],
    cookTime: '5 min',
    servings: '1 serving'
  },
  {
    id: '6',
    name: 'Stir-fry Vegetables',
    type: 'dinner',
    ingredients: ['Mixed vegetables', 'Soy sauce', 'Ginger', 'Garlic', 'Rice'],
    cookTime: '15 min',
    servings: '3 servings'
  }
];

export const AddRecipeDialog: React.FC<AddRecipeDialogProps> = ({
  isOpen,
  onClose,
  onAddMeal,
  mealType
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = ['Quick', 'Healthy', 'Vegetarian', 'High Protein', 'Low Carb'];

  const filteredRecipes = SAMPLE_RECIPES.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients?.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMealType = !mealType || recipe.type === mealType;
    
    return matchesSearch && matchesMealType;
  });

  const handleAddRecipe = (recipe: Meal) => {
    onAddMeal(recipe);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add Recipe {mealType && `for ${mealType}`}
          </DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
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

        {/* Recipe List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="p-4 bg-recipe-card border border-border/30 rounded-lg hover:bg-recipe-hover transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{recipe.name}</h4>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {recipe.cookTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {recipe.cookTime}
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {recipe.servings}
                      </div>
                    )}
                  </div>
                  
                  {recipe.ingredients && (
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 4).map(ingredient => (
                        <Badge key={ingredient} variant="secondary" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.ingredients.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <Button
                  variant="recipe"
                  size="sm"
                  onClick={() => handleAddRecipe(recipe)}
                  className="ml-4"
                >
                  Add
                </Button>
              </div>
            </div>
          ))}
          
          {filteredRecipes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No recipes found matching your search.</p>
              <Button variant="link" className="mt-2">
                Add a custom recipe
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};