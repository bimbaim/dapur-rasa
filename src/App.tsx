import { useEffect, useState } from 'react';
// import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { SearchSection } from './components/SearchSection';
import { ResultsSection } from './components/ResultsSection';
import { RecipeModal } from './components/RecipeModal';

export default function App() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  const handleLookupRecipe = async (id: string) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      }
    } catch (err) {
      setError("Failed to fetch recipe details.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const paginatedResults = results.slice(indexOfFirstRecipe, indexOfLastRecipe);

  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  return (
    <div className="relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* <Navigation /> */}
      
      <div className="relative z-10 snap-y snap-mandatory h-screen overflow-y-scroll">
        <HeroSection />
        <SearchSection 
          setResults={setResults} 
          setLoading={setLoading} 
          setError={setError} 
        />
        {/* Conditional rendering: only show ResultsSection if there are results */}
        {results.length > 0 && (
          <ResultsSection 
            results={paginatedResults} 
            loading={loading} 
            error={error} 
            onLookupRecipe={handleLookupRecipe}
            currentPage={currentPage}
            recipesPerPage={recipesPerPage}
            totalRecipes={results.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  );
}