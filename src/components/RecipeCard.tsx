import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from 'react';

interface RecipeCardProps {
  image: string;
  title: string;
  tags: string; // Changed from description to tags
  area: string;
  category: string;
  onClick?: () => void;
}

export function RecipeCard({ image, title, tags, area, category, onClick }: RecipeCardProps) {
  // Split the tags string into an array, or default to an empty array
  const tagList = tags ? tags.split(',') : [];

  return (
    <Card 
      onClick={onClick}
      className="group cursor-pointer bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
    >
      <div className="aspect-video overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-serif text-gray-800 mb-2">{title}</h3>
        {/* Display the tags instead of a description */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tagList.map((tag, index) => (
            <span 
              key={index} 
              className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{category}</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{area}</span>
        </div>
        <Button 
          className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors duration-300"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => { 
            e.stopPropagation(); 
            onClick?.(); 
          }}
        >
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
}