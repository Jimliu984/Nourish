import { Badge } from "@/components/ui/badge";

interface RecipeTagProps {
  tagName: string;
  selectedTags: string[];
  toggleTag: (tagName: string) => void;
}
export default function RecipeTag({
  tagName,
  selectedTags,
  toggleTag,
}: RecipeTagProps) {
  return (
    <Badge
      key={tagName}
      variant={selectedTags.includes(tagName) ? "default" : "outline"}
      className="cursor-pointer hover:bg-primary/20"
      onClick={() => toggleTag(tagName)}
    >
      {tagName}
    </Badge>
  );
}
