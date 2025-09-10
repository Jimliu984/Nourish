"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ChefHat, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ShoppingListDialog from "./ShoppingListDialog";
import AddRecipeDialog from "./AddRecipeDialog";
import ShowRecipeAdded from "./ShowRecipeAdded";
import MealListItems from "./MealListItems";
import { Meal } from "@/lib/MealTypes";
const MEAL_TYPES = ["breakfast", "lunch", "dinner"];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklyPlanner() {
  const [showWeekend, setShowWeekend] = useState(true);

  const displayDays = showWeekend ? DAYS : DAYS.slice(0, 5);

  return (
    <>
      <div className="flex items-center min-w-screen justify-center px-30 py-6 space-x-2">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-3xl justify-start flex flex-1 font-bold text-foreground">
          Weekly Meal Plan
        </h1>
        <Button
          variant="outline"
          className="justify-end flex"
          onClick={() => setShowWeekend(!showWeekend)}
        >
          {showWeekend ? "Hide Weekend" : "Show Weekend"}
        </Button>
        <ShoppingListDialog />
      </div>
      <div className="space-y-6">
        {displayDays.map((day) => (
          <Card
            key={day}
            className="overflow-hidden bg-card border-border/50 shadow-card"
          >
            <div className="bg-gradient-subtle p-4 border-b border-border/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-foreground">{day}</h3>
                <div className="flex items-center gap-2">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                  }) === day && (
                    <Badge variant="default" className="text-xs">
                      Today
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="grid md:grid-cols-3 gap-4">
                {MEAL_TYPES.map((mealType) => (
                  <AddRecipeDialog key={mealType} mealType={mealType}>
                    <div key={mealType} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground capitalize flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {mealType}
                        </h4>
                        <div
                          className="h-7 w-7 p-0 bg-meal-slot text-foreground hover:bg-meal-slot-hover border border-border/50 shadow-card hover:shadow-soft transition flex items-center justify-center rounded-lg cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                        </div>
                      </div>
                      {
                        <div className="min-h-[80px] w-100 p-4 bg-meal-slot border border-border/30 rounded-xl transition-colors hover:bg-meal-slot/80">
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <ChefHat className="h-4 w-4" />
                              <span className="text-xs">Add a meal</span>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </AddRecipeDialog>
                  //  <div key={mealType} className="space-y-3">
                  //     <div className="flex items-center justify-between">
                  //       <h4 className="font-semibold text-foreground capitalize flex items-center gap-2">
                  //         <div className="w-2 h-2 rounded-full bg-primary"></div>
                  //         {mealType}
                  //       </h4>
                  //       <AddRecipeDialog key={mealType} mealType={mealType}>
                  //         <div
                  //         className="h-7 w-7 p-0 bg-meal-slot text-foreground hover:bg-meal-slot-hover border border-border/50 shadow-card hover:shadow-soft transition flex items-center justify-center rounded-lg cursor-pointer"
                  //         >
                  //           <Plus className="h-3 w-3" />
                  //         </div>
                  //       </AddRecipeDialog>
                  //     </div>
                  //     {
                  //       <div className="min-h-[80px] w-100 p-4 bg-meal-slot border border-border/30 rounded-xl transition-colors hover:bg-meal-slot/80">
                  //         <div className="flex items-center justify-center h-full text-muted-foreground">
                  //           <div className="flex flex-col items-center gap-2 text-center">
                  //             <MealListItems meals={[{id: "1", name: "Sample Meal", type: "breakfast"}] as Meal[]} day={day} mealType={mealType} removeMeal={() => {}} />
                  //           </div>
                  //         </div>
                  //       </div>
                  //     }
                  //   </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
