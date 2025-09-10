'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, ShoppingCart, Calendar, ChefHat, LayoutGrid, Rows3 } from 'lucide-react';
import { AddRecipeDialog } from './AddRecipeDialogAI';
import { ShoppingListDialog } from './ShoppingListDialogAI';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients?: string[];
}

interface DayMeals {
  [key: string]: Meal[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'] as const;

export default function WeeklyCalendar() {
    const [weekMeals, setWeekMeals] = useState<DayMeals>({});
  const [showWeekend, setShowWeekend] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; mealType: string } | null>(null);
  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [showShoppingList, setShowShoppingList] = useState(false);

  const displayDays = showWeekend ? DAYS : DAYS.slice(0, 5);

  const addMealToSlot = (day: string, mealType: string, meal: Meal) => {
    setWeekMeals(prev => ({
      ...prev,
      [`${day}-${mealType}`]: [...(prev[`${day}-${mealType}`] || []), meal]
    }));
    setSelectedSlot(null);
  };

  const removeMeal = (day: string, mealType: string, mealId: string) => {
    setWeekMeals(prev => ({
      ...prev,
      [`${day}-${mealType}`]: prev[`${day}-${mealType}`]?.filter(meal => meal.id !== mealId) || []
    }));
  };

  const openShoppingList = () => {
    setShowShoppingList(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Weekly Meal Plan</h2>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setLayoutMode(layoutMode === 'vertical' ? 'horizontal' : 'vertical')}
            size="sm"
            className="gap-2"
          >
            {layoutMode === 'vertical' ? <LayoutGrid className="h-4 w-4" /> : <Rows3 className="h-4 w-4" />}
            {layoutMode === 'vertical' ? 'Grid View' : 'List View'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowWeekend(!showWeekend)}
            size="sm"
          >
            {showWeekend ? 'Hide Weekend' : 'Show Weekend'}
          </Button>
          <Button 
            variant="gradient" 
            onClick={openShoppingList}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Shopping List
          </Button>
        </div>
      </div>

      {/* Calendar Display */}
      {layoutMode === 'vertical' ? (
        /* Vertical List Layout */
        <div className="space-y-6">
          {displayDays.map(day => (
            <Card key={day} className="overflow-hidden bg-card border-border/50 shadow-card">
              <div className="bg-gradient-subtle p-4 border-b border-border/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-foreground">{day}</h3>
                  <div className="flex items-center gap-2">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day && (
                      <Badge variant="default" className="text-xs">Today</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {MEAL_TYPES.map(mealType => (
                    <div key={mealType} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground capitalize flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {mealType}
                        </h4>
                        <Button
                          variant="meal"
                          size="sm"
                          onClick={() => setSelectedSlot({ day, mealType })}
                          className="h-7 w-7 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="min-h-[80px] p-4 bg-meal-slot border border-border/30 rounded-xl transition-colors hover:bg-meal-slot/80">
                        {weekMeals[`${day}-${mealType}`]?.length ? (
                          <div className="space-y-2">
                            {weekMeals[`${day}-${mealType}`].map(meal => (
                              <div 
                                key={meal.id}
                                className="group flex items-center justify-between bg-recipe-card p-3 rounded-lg border border-border/20 transition-all hover:shadow-sm hover:border-border/40"
                              >
                                <span className="text-sm font-medium text-foreground">{meal.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeMeal(day, mealType, meal.id)}
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <ChefHat className="h-4 w-4" />
                              <span className="text-xs">Add a meal</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Horizontal Grid Layout */
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {MEAL_TYPES.map(mealType => (
              <div key={mealType} className="text-center">
                <h3 className="font-bold text-lg text-foreground capitalize flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {mealType}
                </h3>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {displayDays.map(day => (
              <Card key={day} className="overflow-hidden bg-card border-border/50 shadow-card">
                <div className="grid grid-cols-4 min-h-[120px]">
                  <div className="bg-gradient-subtle p-4 flex items-center justify-between border-r border-border/30">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{day}</h3>
                      {new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day && (
                        <Badge variant="default" className="text-xs mt-1">Today</Badge>
                      )}
                    </div>
                  </div>
                  
                  {MEAL_TYPES.map(mealType => (
                    <div key={mealType} className="p-3 border-r border-border/30 last:border-r-0">
                      <div className="flex items-center justify-between mb-2">
                        <Button
                          variant="meal"
                          size="sm"
                          onClick={() => setSelectedSlot({ day, mealType })}
                          className="h-6 w-6 p-0 ml-auto"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="min-h-[70px] space-y-1">
                        {weekMeals[`${day}-${mealType}`]?.length ? (
                          weekMeals[`${day}-${mealType}`].map(meal => (
                            <div 
                              key={meal.id}
                              className="group flex items-center justify-between bg-recipe-card p-2 rounded text-xs border border-border/20 transition-all hover:shadow-sm"
                            >
                              <span className="font-medium text-foreground truncate">{meal.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMeal(day, mealType, meal.id)}
                                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive text-xs"
                              >
                                ×
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <ChefHat className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Recipe Dialog */}
      <AddRecipeDialog
        isOpen={selectedSlot !== null}
        onClose={() => setSelectedSlot(null)}
        onAddMeal={(meal) => {
          if (selectedSlot) {
            addMealToSlot(selectedSlot.day, selectedSlot.mealType, meal);
          }
        }}
        mealType={selectedSlot?.mealType}
      />

      {/* Shopping List Dialog */}
      <ShoppingListDialog
        isOpen={showShoppingList}
        onClose={() => setShowShoppingList(false)}
        weekMeals={weekMeals}
      />
    </div>
  );
}
