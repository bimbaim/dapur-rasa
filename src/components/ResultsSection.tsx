import { RecipeCard } from "./RecipeCard";
import { PaginationControls } from "./PaginationControls";
// import React from "react";

interface ResultsSectionProps {
  results: any[];
  loading: boolean;
  error: string;
  onLookupRecipe: (id: string) => void;
  // Pagination Props
  currentPage: number;
  recipesPerPage: number;
  totalRecipes: number;
  onPageChange: (page: number) => void;
}

export function ResultsSection({ results, loading, error, onLookupRecipe, currentPage, recipesPerPage, totalRecipes, onPageChange }: ResultsSectionProps) {
  return (
    <section id="results" className="min-h-screen py-16 relative snap-start">
      <div className="absolute inset-0 bg-white/90 z-10"></div>
      <div className="z-20 relative px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-800 mb-4">Recipe Collection</h2>
          <p className="text-gray-600 text-lg">Discover delicious recipes crafted with love</p>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              image={recipe.strMealThumb}
              title={recipe.strMeal}
              tags={recipe.strTags || "-"}
              area={recipe.strArea || "Global"}
              category={recipe.strCategory || "Recipe"}
              onClick={() => onLookupRecipe(recipe.idMeal)}
            />
          ))}
        </div>

        {!loading && !error && results.length > 0 && (
          <PaginationControls
            totalRecipes={totalRecipes}
            recipesPerPage={recipesPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
}