"use client";
import { Button } from "@/components/ui/button";
import { useMutationUpdateRecipe } from "@/lib/hooks/api/recipes";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AddFavouriteButton({
  recipeId,
  isFavorite,
}: {
  recipeId: number;
  isFavorite: boolean;
}) {
  const [favorite, setFavorite] = useState(isFavorite);
  const updateFav = useMutationUpdateRecipe();
  const queryClient = useQueryClient();
  function toggleFavorite() {
    async function updateFavorite() {
      await updateFav.mutateAsync({
        id: recipeId,
        data: { isFavorite: !favorite },
      });
      await queryClient.invalidateQueries({ queryKey : ['recipes'] })
    }
    updateFavorite();
    setFavorite(!favorite);
    toast(favorite ? "Removed from favourites" : "Added to favourites");
  }
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleFavorite}
      className="gap-2"
    >
      <Heart
        className={`h-4 w-4 ${favorite ? "fill-current text-red-500" : ""}`}
      />
      {favorite ? "Favourited" : "Add to Favourites"}
    </Button>
  );
}
