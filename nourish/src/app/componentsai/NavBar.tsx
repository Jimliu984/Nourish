'use client'
import { Button } from "@/components/ui/button";
import { Calendar, ChefHat, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function NavBar() {
    const [currentPage, setCurrentPage] = useState('calendar');
    function onPageChange(page: string) {
        setCurrentPage(page);
    }
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FoodPrep</h1>
              <p className="text-xs text-muted-foreground">
                Plan • Cook • Enjoy
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button
                variant={currentPage === "calendar" ? "default" : "ghost"}
                onClick={() => onPageChange("calendar")}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Meal Planner
              </Button>
            </Link>
            <Link href="/recipes">
              <Button
                variant={currentPage === "recipes" ? "default" : "ghost"}
                onClick={() => onPageChange("recipes")}
                className="gap-2"
              >
                <ChefHat className="h-4 w-4" />
                Recipes
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t bg-background">
          <div className="container flex p-2 gap-2">
            <Button
              variant={currentPage === "calendar" ? "default" : "ghost"}
              onClick={() => onPageChange("calendar")}
              className="flex-1 gap-2"
              size="sm"
            >
              <Calendar className="h-4 w-4" />
              Planner
            </Button>
            <Button
              variant={currentPage === "recipes" ? "default" : "ghost"}
              onClick={() => onPageChange("recipes")}
              className="flex-1 gap-2"
              size="sm"
            >
              <ChefHat className="h-4 w-4" />
              Recipes
            </Button>
          </div>
        </div>
      </header>
    );
}