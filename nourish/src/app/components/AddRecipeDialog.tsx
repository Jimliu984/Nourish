import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RecipeOverview } from "@/lib/MealTypes";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import RecipeTag from "./RecipeTag";
import AddRecipeDialogCard from "./AddRecipeDialogCard";

interface AddRecipeDialogProps {
  mealType?: string;
  children: React.ReactNode;
}
const availableTags = ['Quick', 'Healthy', 'Vegetarian', 'High Protein', 'Low Carb'];

const SAMPLE_RECIPES: RecipeOverview[] = [
  {
    id: 1,
    name: 'Overnight Oats',
    type: 'breakfast',
    ingredients: ['Oats', 'Milk', 'Chia seeds', 'Honey', 'Berries'],
    cookTime: 5,
    servings: 1
  },
  {
    id: 2,
    name: 'Grilled Chicken Salad',
    type: 'lunch',
    ingredients: ['Chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil'],
    cookTime: 20,
    servings: 2
  },
  {
    id: 3,
    name: 'Salmon with Quinoa',
    type: 'dinner',
    ingredients: ['Salmon fillet', 'Quinoa', 'Broccoli', 'Lemon', 'Garlic'],
    cookTime: 25,
    servings: 2
  },
  {
    id: 4,
    name: 'Greek Yogurt Parfait',
    type: 'breakfast',
    ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Honey'],
    cookTime: 2,
    servings: 1
  },
  {
    id: 5,
    name: 'Turkey & Avocado Wrap',
    type: 'lunch',
    ingredients: ['Turkey slices', 'Avocado', 'Spinach', 'Tomato', 'Whole wheat tortilla'],
    cookTime: 5,
    servings: 1
  },
  {
    id: 6,
    name: 'Stir-fry Vegetables',
    type: 'dinner',
    ingredients: ['Mixed vegetables', 'Soy sauce', 'Ginger', 'Garlic', 'Rice'],
    cookTime: 15,
    servings: 3
  }
];

export default function AddRecipeDialog({ mealType, children }: AddRecipeDialogProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }
  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
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
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <RecipeTag tagName={tag} toggleTag={toggleTag} selectedTags={selectedTags} key={tag}  />
          ))}
        </div>
        <AddRecipeDialogCard title="Recipe 1" servings={5} prepTime={120} ingredients={["chicken", "mushroom", "rice", "soy sauce", "seaweed", "sesame"]} />
      </DialogContent>
    </Dialog>
  );
}
