import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ShoppingListDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'combined' | 'by-recipe'>('combined');

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }
  return (
    <Dialog open={isOpen} onOpenChange={() => handleOpenChange(!isOpen)}>
      <DialogTrigger className="flex items-center bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md px-4 py-2 gap-2">
        <ShoppingCart className="h-4 w-4" />
        <span>Shopping List</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Weekly Shopping List
        </DialogTitle>
        <DialogDescription>
            Your ingredients organized by preference
          </DialogDescription>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'combined' | 'by-recipe')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combined">Combined List</TabsTrigger>
            <TabsTrigger value="by-recipe">By Recipe</TabsTrigger>
          </TabsList>
          <TabsContent value="combined" className="mt-4">
            <div className="max-h-[400px] overflow-y-auto">
                No meals planned this week!
            </div>
          </TabsContent>

          <TabsContent value="by-recipe" className="mt-4">
            <div className="max-h-[400px] overflow-y-auto">
                No recipes added this week!
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
