"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ChefHat, Plus } from "lucide-react";
import { useState } from "react";
import ShoppingListDialog from "./ShoppingListDialog";
import AddRecipeDialog from "./AddRecipeDialog";
import MealListItem from "./MealListItem";
import { ShoppingListRecipe, Week, WeekPlan } from "@/lib/types";
import { getLastMondayDate } from "@/lib/helpers/dateHelper";
const MEAL_TIMES : ("breakfast" | "lunch" | "dinner")[] = ["breakfast", "lunch", "dinner"];
const DAYS : Week[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function WeeklyPlanner() {
  const [showWeekend, setShowWeekend] = useState(true);
  const [weekRecipe, setWeekRecipe] = useState<WeekPlan>({
    startDate : getLastMondayDate(),
    monday : { breakfast: [], lunch: [], dinner: [] },
    tuesday : { breakfast: [], lunch: [], dinner: [] },
    wednesday : { breakfast: [], lunch: [], dinner: [] },
    thursday : { breakfast: [], lunch: [], dinner: [] },
    friday : { breakfast: [], lunch: [], dinner: [] },
    saturday : { breakfast: [], lunch: [], dinner: [] },
    sunday : { breakfast: [], lunch: [], dinner: [] },
  })

  function addRecipe(
    recipe: ShoppingListRecipe,
    mealTime: "breakfast" | "lunch" | "dinner",
    day: Week
  ) {
    setWeekRecipe((prev) => {
      const update : WeekPlan = {
         startDate : prev.startDate,
          monday : { breakfast: [...prev.monday.breakfast], lunch: [...prev.monday.lunch], dinner: [...prev.monday.dinner] },
          tuesday : { breakfast: [...prev.tuesday.breakfast], lunch: [...prev.tuesday.lunch], dinner: [...prev.tuesday.dinner] },
          wednesday : { breakfast: [...prev.wednesday.breakfast], lunch: [...prev.wednesday.lunch], dinner: [...prev.wednesday.dinner] },
          thursday : { breakfast: [...prev.thursday.breakfast], lunch: [...prev.thursday.lunch], dinner: [...prev.thursday.dinner] },
          friday : { breakfast: [...prev.friday.breakfast], lunch: [...prev.friday.lunch], dinner: [...prev.friday.dinner] },
          saturday : { breakfast: [...prev.saturday.breakfast], lunch: [...prev.saturday.lunch], dinner: [...prev.saturday.dinner] },
          sunday : { breakfast: [...prev.sunday.breakfast], lunch: [...prev.sunday.lunch], dinner: [...prev.sunday.dinner] },
      }
      update[day][mealTime].push(recipe);
      return update;
    });
  }

  function removeRecipe(
    day: Week,
    mealType: "breakfast" | "lunch" | "dinner",
    recipeName: string,
  ) {
    setWeekRecipe((prev) => {
      const update : WeekPlan = {
         startDate : prev.startDate,
          monday : { breakfast: [...prev.monday.breakfast], lunch: [...prev.monday.lunch], dinner: [...prev.monday.dinner] },
          tuesday : { breakfast: [...prev.tuesday.breakfast], lunch: [...prev.tuesday.lunch], dinner: [...prev.tuesday.dinner] },
          wednesday : { breakfast: [...prev.wednesday.breakfast], lunch: [...prev.wednesday.lunch], dinner: [...prev.wednesday.dinner] },
          thursday : { breakfast: [...prev.thursday.breakfast], lunch: [...prev.thursday.lunch], dinner: [...prev.thursday.dinner] },
          friday : { breakfast: [...prev.friday.breakfast], lunch: [...prev.friday.lunch], dinner: [...prev.friday.dinner] },
          saturday : { breakfast: [...prev.saturday.breakfast], lunch: [...prev.saturday.lunch], dinner: [...prev.saturday.dinner] },
          sunday : { breakfast: [...prev.sunday.breakfast], lunch: [...prev.sunday.lunch], dinner: [...prev.sunday.dinner] },
      }
      update[day][mealType] = update[day][mealType].filter((r) => r.name.toLowerCase() !== recipeName.toLowerCase());
      return update;
    });
  }
  const displayDays = showWeekend ? DAYS : DAYS.slice(0, 5);

  return (
    <>
      <div className="flex items-center min-w-screen justify-center px-30 space-x-2 space-y-6">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-3xl justify-start flex flex-1 font-bold text-foreground">
          Weekly Meal Plan
        </h1>
        <div className="flex space-x-2 items-center">
        <Button
          variant="outline"
          className="justify-end flex"
          onClick={() => setShowWeekend(!showWeekend)}
        >
          {showWeekend ? "Hide Weekend" : "Show Weekend"}
        </Button>
        <ShoppingListDialog weekPlan={weekRecipe} />
        </div>
      </div>
      <div className="space-y-6">
        {displayDays.map((day) => (
          <Card
            key={day}
            className="overflow-hidden bg-card border-border/50 shadow-card pt-0"
          >
            <div className="bg-gradient-subtle p-4 border-b border-border/30">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-foreground">{day.slice(0,1).toUpperCase() + day.slice(1)}</h3>
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
                {MEAL_TIMES.map((mealTime) => (
                  weekRecipe[day][mealTime].length === 0 ? 
                  <AddRecipeDialog key={mealTime} day={day} mealTime={mealTime} addRecipe={addRecipe}>
                    <div key={mealTime} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground capitalize flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {mealTime}
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
                  </AddRecipeDialog> :
                   <div key={mealTime} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground capitalize flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {mealTime}
                        </h4>
                        <AddRecipeDialog key={mealTime} day={day} mealTime={mealTime} addRecipe={addRecipe}>
                          <div
                          className="h-7 w-7 p-0 bg-meal-slot text-foreground hover:bg-meal-slot-hover border border-border/50 shadow-card hover:shadow-soft transition flex items-center justify-center rounded-lg cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </div>
                        </AddRecipeDialog>
                      </div>
                      {weekRecipe[day][mealTime].map((recipe, index) => 
                       ( <div key={index} className="min-h-[80px] w-100 p-4 bg-meal-slot border border-border/30 rounded-xl transition-colors hover:bg-meal-slot/80">
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <MealListItem recipeName={recipe.name} day={day} mealType={mealTime} removeMeal={removeRecipe} />
                            </div>
                          </div>
                        </div>)
                      )}
                    </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
