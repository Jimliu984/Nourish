"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FavouriteButton({
  isFavorite,
}: {
  isFavorite: boolean;
}) {
  const [favorite, setFavorite] = useState(isFavorite);
  function toggleFavorite() {
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
