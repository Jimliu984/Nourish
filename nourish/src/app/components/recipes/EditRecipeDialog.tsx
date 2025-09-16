"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X, Plus, Copy, Edit } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Ingredient, Recipe, RecipeFormValues } from "@/lib/types";
import { useMutationCreateRecipe, useMutationUpdateRecipe } from "@/lib/hooks/api/recipes";
import { useQueryClient } from "@tanstack/react-query";
import { ALL_TAGS } from "@/lib/tags";

export default function EditRecipeDialog( { recipe, duplicate } : {recipe : Recipe, duplicate : boolean}) {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }
  const triggerClass = duplicate ? "bg-background text-foreground hover:bg-primary/20" : "bg-primary hover:bg-primary/90 text-primary-foreground";
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className={`${triggerClass} flex items-center border shadow-xs rounded-md px-4 gap-2 text-sm font-medium justify-center whitespace-nowrap`}>
        {duplicate ? <Copy className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
        {duplicate ? "Duplicate" : "Edit Recipe"}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[45vh] md:min-w-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{duplicate ? "Duplicate Recipe" : "Edit Recipe"}</DialogTitle>
        </DialogHeader>
        <EditNewRecipeForm
          recipe={recipe}
          duplicate={duplicate}
          handleOpenChange={handleOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}

function EditNewRecipeForm({
  recipe,
  duplicate,
  handleOpenChange,
}: {
  recipe : Recipe,
  duplicate : boolean,
  handleOpenChange: (open: boolean) => void;
}) {
  const createNewRecipe = useMutationCreateRecipe();
  const updateRecipe = useMutationUpdateRecipe();
  const queryClient = useQueryClient();
  const form = useForm<RecipeFormValues>({
    defaultValues: {
      name: duplicate ? `${recipe.name} (Copy)` : recipe.name,
      type: recipe.type,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      description: recipe.description,
      isFavorite: recipe.isFavorite,
      tags: recipe.tags,
    },
  });
  const ingredients = form.watch("ingredients");
  const instructions = form.watch("instructions");
  const tags = form.watch("tags");
  const onSubmit: SubmitHandler<RecipeFormValues> = async (
    data: RecipeFormValues
  ) => {
    try {
      let servings = data.servings;
      let cookTime = data.cookTime;
      if (data.name === "") {
        form.setError("name", {});
      } else if (data.ingredients.length === 0) {
        form.setError("ingredients", {});
      } else if (data.instructions.length === 0) {
        form.setError("instructions", {});
      } else {
        if (typeof data.servings === "string") {
          servings = Number.parseInt(data.servings);
        }
        if (typeof data.cookTime === "string") {
          cookTime = Number.parseInt(data.cookTime);
        }
        data.servings = servings;
        data.cookTime = cookTime;
      }
      if (duplicate) {
        // Create new recipe
        await createNewRecipe.mutateAsync(data);
      } else {
        // Update curent recipe
        const { type, ...rest } = data;
        await updateRecipe.mutateAsync( {id: recipe.id, data: { ...rest , mealType: type } });
        await queryClient.invalidateQueries({ queryKey : ['recipes', recipe.id]});
        queryClient.getQueryData(['recipes', recipe.id])
      }
      handleOpenChange(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addIngredient = (ingredient: Ingredient) => {
    form.setValue("ingredients", [...ingredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    form.setValue("ingredients", updated);
  };

  const updateIngredient = (index: number, value: Ingredient) => {
    const updated = [...ingredients];
    updated[index] = value;
    form.setValue("ingredients", updated);
  };

  const addInstruction = (instruction: string) => {
    form.setValue("instructions", [...instructions, instruction]);
  };

  const removeInstruction = (index: number) => {
    const updated = instructions.filter((_, i) => i !== index);
    form.setValue("instructions", updated);
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    form.setValue("instructions", updated);
  };

  const addTag = (tagName: string) => {
    form.setValue("tags", [...tags, tagName]);
  };

  const removeTag = (index: number) => {
    const updated = tags.filter((_, i) => i !== index);
    form.setValue("tags", updated);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter recipe name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="cookTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cook Time (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servings</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <IngredientsField
              ingredients={ingredients}
              addNewIngredient={addIngredient}
              removeIngredient={removeIngredient}
              updateIngredient={updateIngredient}
            />
            <InstructionsField
              instructions={instructions}
              addNewInstruction={addInstruction}
              removeInstruction={removeInstruction}
              updateInstruction={updateInstruction}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your recipe..."
                    className="min-h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <TagsField tags={tags} addTag={addTag} removeTag={removeTag} />
            )}
          />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Recipe</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

interface IngredientsFieldProps {
  ingredients: Ingredient[];
  addNewIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (index: number, value: Ingredient) => void;
}

interface InstructionsFieldProps {
  instructions: string[];
  addNewInstruction: (instruction: string) => void;
  removeInstruction: (index: number) => void;
  updateInstruction: (index: number, value: string) => void;
}

interface TagsFieldProps {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
}

function IngredientsField({
  ingredients,
  addNewIngredient,
  updateIngredient,
  removeIngredient,
}: IngredientsFieldProps) {
  const [newIngredient, setNewIngredient] = useState<Ingredient>({ name: "", quantity: ""});
  function updateIngredientName(index: number, value: string){
    const ing = ingredients[index];
    updateIngredient(index, {...ing, name: value});
  }

  function updateIngredientQuantity(index: number, value: string){
    const ing = ingredients[index];
    updateIngredient(index, {...ing, quantity: value});

  }
  return (
    <FormItem>
      <FormLabel className="max-h-[20px]">Ingredients *</FormLabel>
      <div className="space-y-2 top-0">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2">
            <FormControl>
              <Input
                value={ingredient.name}
                onChange={(e) => updateIngredientName(index, e.target.value)}
                placeholder="Enter ingredient"
                className="flex-1"
              />
            </FormControl>
            <FormControl>
              <Input
                value={ingredient.quantity}
                onChange={(e) => updateIngredientQuantity(index, e.target.value)}
                placeholder="Quantity"
                className="flex-1"
              />
            </FormControl>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeIngredient(index)}
              disabled={ingredients.length === 1}
              className="self-start mt-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            value={newIngredient.name}
            onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
            placeholder="Add new ingredient"
            className="flex-1"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     e.preventDefault();
            //     if (newIngredient.name.trim()) {
            //       addNewIngredient(newIngredient);
            //       setNewIngredient({name: "", quantity: ""});
            //     }
            //   }
            // }}
          />
          <Input
            value={newIngredient.quantity}
            onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
            placeholder="Quantity"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (newIngredient.name.trim() && newIngredient.quantity.trim()) {
                  addNewIngredient(newIngredient);
                  setNewIngredient({name: "", quantity: ""});
                }
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (newIngredient.name.trim()) {
                addNewIngredient(newIngredient);
                setNewIngredient({name: "", quantity: ""});
              }
            }}
            className="self-start mt-1"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <FormMessage />
    </FormItem>
  );
}

function InstructionsField({
  instructions,
  addNewInstruction,
  removeInstruction,
  updateInstruction,
}: InstructionsFieldProps) {
  const [newInstruction, setNewInstruction] = useState("");

  return (
    <FormItem>
      <FormLabel className="max-h-[20px]">Instructions *</FormLabel>
      <div className="space-y-2">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex items-center justify-center w-8 h-10 bg-muted rounded-md text-sm font-medium text-muted-foreground flex-shrink-0">
              {index + 1}
            </div>
            <FormControl>
              <Textarea
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder="Enter instruction step"
                className="flex-1 min-h-[40px] resize-none"
                rows={2}
              />
            </FormControl>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeInstruction(index)}
              disabled={instructions.length === 1}
              className="self-start mt-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <div className="flex items-center justify-center w-8 h-10 bg-muted rounded-md text-sm font-medium text-muted-foreground flex-shrink-0">
            {instructions.length + 1}
          </div>
          <Textarea
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
            placeholder="Add new instruction step"
            className="flex-1 min-h-[40px] resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                e.preventDefault();
                if (newInstruction.trim()) {
                  addNewInstruction(newInstruction);
                  setNewInstruction("");
                }
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (newInstruction.trim()) {
                addNewInstruction(newInstruction);
                setNewInstruction("");
              }
            }}
            className="self-start mt-1"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Press Ctrl+Enter to add step
        </p>
      </div>
      <FormMessage />
    </FormItem>
  );
}

function TagsField({ tags, addTag, removeTag }: TagsFieldProps) {
  const [tagSearch, setTagSearch] = useState("");
  const filteredTags = ALL_TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(tagSearch.toLowerCase()) && !tags.includes(tag)
  );

  return (
    <FormItem>
      <FormLabel>Tags</FormLabel>
      <div className="space-y-3">
        <Input
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          placeholder="Search for tags..."
        />
        {tagSearch && filteredTags.length > 0 && (
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-md bg-muted/30">
            {filteredTags.map((tag) => (
              <Button
                key={tag}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  addTag(tag);
                  setTagSearch("");
                }}
                className="h-8"
              >
                {tag}
              </Button>
            ))}
          </div>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={tag} variant="secondary" className="pr-1">
                {tag}
                <button
                  onClick={() => {
                    removeTag(index);
                  }}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      <FormMessage />
    </FormItem>
  );
}
