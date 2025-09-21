import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import React from "react";
import { AutocompleteInput } from "./AutocompleteInput";

interface SearchSectionProps {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchSection({ setResults, setLoading, setError }: SearchSectionProps) {
  const [activeSearch, setActiveSearch] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleFindRecipes = async () => {
    if (!activeSearch || !query) return;
    setLoading(true);
    setError("");
    setResults([]);

    let url = "";
    switch (activeSearch) {
      case "name":
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        break;
      case "ingredient":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
        break;
      case "category":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
        break;
      case "cuisine":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`;
        break;
      default:
        setError("Invalid search type selected.");
        setLoading(false);
        return;
    }

    try {
      const initialRes = await fetch(url);
      const initialData = await initialRes.json();
      
      if (initialData.meals) {
        const fullRecipePromises = initialData.meals.map(async (meal: any) => {
          const lookupUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
          const lookupRes = await fetch(lookupUrl);
          const lookupData = await lookupRes.json();
          return lookupData.meals?.[0] || meal;
        });

        const fullRecipes = await Promise.all(fullRecipePromises);
        setResults(fullRecipes);
      } else {
        setResults([]);
      }
      
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const autocompleteEndpoints: { [key: string]: string } = {
    name: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    ingredient: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
    cuisine: "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  };

  const categories = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian"
  ];

  return (
    <section
      id="search"
      className="h-screen flex items-center justify-center relative snap-start"
    >
      <div className="absolute inset-0 bg-white/85 z-10"></div>
      <div className="z-20 px-8 max-w-3xl mx-auto w-full">
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif text-gray-800 mb-4">
              Find Your Perfect Recipe
            </h2>
            <p className="text-gray-600">
              Choose how you want to search below
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["name", "ingredient", "category", "cuisine"].map((type) => (
              <Button
                key={type}
                variant={activeSearch === type ? "default" : "outline"}
                onClick={() => {
                  setActiveSearch(type);
                  setQuery("");
                }}
                className={`px-6 py-2 rounded-xl ${
                  activeSearch === type ? "bg-orange-600 text-white" : ""
                }`}
              >
                By {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          {activeSearch && (
            <div className="flex flex-col md:flex-row gap-4">
              {activeSearch === "name" && (
                <AutocompleteInput
                  apiEndpoint={autocompleteEndpoints.name}
                  placeholder="e.g. Arrabiata"
                  query={query}
                  setQuery={setQuery}
                  onSelect={(value) => setQuery(value)}
                  searchType="name"
                />
              )}
              
              {activeSearch === "ingredient" && (
                <AutocompleteInput
                  apiEndpoint={autocompleteEndpoints.ingredient}
                  placeholder="e.g. Chicken"
                  query={query}
                  setQuery={setQuery}
                  onSelect={(value) => setQuery(value)}
                  searchType="ingredient"
                />
              )}
              
              {activeSearch === "category" && (
                <Select onValueChange={setQuery}>
                  <SelectTrigger className="h-12 rounded-xl bg-orange-50 border-orange-200 flex-1">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {activeSearch === "cuisine" && (
                <AutocompleteInput
                  apiEndpoint={autocompleteEndpoints.cuisine}
                  placeholder="e.g. Italian"
                  query={query}
                  setQuery={setQuery}
                  onSelect={(value) => setQuery(value)}
                  searchType="cuisine"
                />
              )}

              <Button
                onClick={handleFindRecipes}
                className="h-12 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
              >
                Search
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}