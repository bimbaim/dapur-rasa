import React, { useState, useEffect, useRef } from 'react';
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

interface AutocompleteInputProps {
  apiEndpoint: string;
  placeholder: string;
  onSelect: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
  searchType: string;
}

export function AutocompleteInput({ 
  apiEndpoint, 
  placeholder, 
  onSelect, 
  query,
  setQuery,
  searchType
}: AutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch initial data based on search type (for ingredient/cuisine)
  useEffect(() => {
    // Only fetch for 'ingredient' and 'cuisine'
    if (searchType === 'ingredient' || searchType === 'cuisine') {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(apiEndpoint);
          const data = await res.json();
          const key = Object.keys(data)[0]; 
          setAllData(data[key] || []); 
        } catch (err) {
          console.error("Failed to fetch autocomplete data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [apiEndpoint, searchType]);

  // Dynamic search/filter based on search type
  useEffect(() => {
    const fetchAndFilterSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setLoading(true);

      let filteredSuggestions: any[] = [];
      
      // Handle 'name' search (dynamic API call)
      if (searchType === 'name') {
        try {
          const res = await fetch(`${apiEndpoint}${query}`);
          const data = await res.json();
          filteredSuggestions = data.meals || [];
        } catch (err) {
          console.error("Failed to fetch name suggestions:", err);
        }
      } 
      // Handle 'ingredient' or 'cuisine' search (local filtering)
      else {
        filteredSuggestions = allData.filter(item => {
          const itemName = item.strIngredient || item.strArea || "";
          return itemName.toLowerCase().includes(query.toLowerCase());
        });
      }

      setSuggestions(filteredSuggestions.slice(0, 10));
      setLoading(false);
    };

    const debounceFetch = setTimeout(() => {
      fetchAndFilterSuggestions();
    }, 300); // Debounce to reduce API calls

    return () => clearTimeout(debounceFetch);
  }, [query, allData, apiEndpoint, searchType]);

  // Handle outside clicks to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: any) => {
    const itemName = searchType === 'name' ? item.strMeal : (item.strIngredient || item.strArea || "");
    setQuery(itemName);
    onSelect(itemName);
    setSuggestions([]);
  };

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 text-lg rounded-xl bg-orange-50 border-orange-200 w-full"
      />
      {loading && query.length > 0 && (
        <p className="absolute left-0 right-0 top-full mt-1 z-50 px-4 py-2 text-center text-sm text-gray-500 bg-orange-50 rounded-b-xl border border-orange-200">
          Loading suggestions...
        </p>
      )}
      {suggestions.length > 0 && !loading && (
        <Card className="absolute left-0 right-0 top-full mt-1 z-50 p-0 bg-orange-50 rounded-xl border border-orange-200 min-w-0 w-full">
          <CardContent className="p-0">
            <ul className="max-h-60 overflow-y-auto custom-scrollbar">
              {suggestions.map((item, index) => {
                const itemName = searchType === 'name' ? item.strMeal : (item.strIngredient || item.strArea || "");
                return (
                  <li
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer px-4 py-2 hover:bg-orange-100 rounded-lg transition-colors text-gray-700"
                  >
                    {itemName}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}