"use client";

import { Button } from "@/components/ui/button";
import { useMutationUpdateRecipe } from "@/lib/hooks/api/recipes";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RecipeCardFavouriteHeart({
  recipeId,
  isFavourite,
}: {
  recipeId: number;
  isFavourite: boolean;
}) {
  const [isRed, setIsRed] = useState(isFavourite);
  const updateFav = useMutationUpdateRecipe();
  function toggleFavorite() {
    async function updateFavorite() {
      await updateFav.mutateAsync({
        id: recipeId,
        data: { isFavorite: !isRed },
      });
    }
    updateFavorite();
    setIsRed(!isRed);
    toast(isRed ? "Removed from favourites" : "Added to favourites");
  }
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleFavorite()}
        className="text-red-500 hover:text-red-600"
      >
        <Heart className={`h-4 w-4 ${isRed ? "fill-current" : ""}`} />
      </Button>
    </>
  );
}
