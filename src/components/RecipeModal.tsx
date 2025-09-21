import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface RecipeModalProps {
    recipe: any;
    onClose: () => void;
}

export function RecipeModal({ recipe, onClose }: RecipeModalProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const getIngredients = (recipe: any) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({ ingredient, measure });
            }
        }
        return ingredients;
    };

    const ingredientsList = getIngredients(recipe);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                onClick={handleBackdropClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    className="bg-orange-50 rounded-2xl shadow-2xl max-w-2xl w-full relative flex flex-col" // Changed background color
                    style={{ maxHeight: '90vh' }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 bg-white rounded-full p-2 shadow-md z-10 transition-all duration-200 hover:scale-105"
                        aria-label="Close recipe details"
                    >
                        <X size={24} />
                    </button>

                    {/* Header image */}
                    <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-t-2xl">
                        <img
                            src={recipe.strMealThumb}
                            alt={recipe.strMeal}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                        <h2 className="text-3xl font-serif text-gray-800 mb-2">{recipe.strMeal}</h2>
                        <p className="text-gray-600 text-sm mb-6 pb-4 border-b border-gray-200">
                            <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">{recipe.strArea || "Unknown"}</span>
                            <span className="ml-2 bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">{recipe.strCategory || "Unknown"}</span>
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-6 pb-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-3">Ingredients</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    {ingredientsList.length > 0 ? (
                                        ingredientsList.map((item, index) => (
                                            <li key={index} className="pl-1">
                                                <span className="font-medium">{item.ingredient}</span> - {item.measure}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No ingredients listed.</li>
                                    )}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-3">Instructions</h3>
                                <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                                    {recipe.strInstructions || "No instructions provided."}
                                </p>
                            </div>
                        </div>

                        {recipe.strYoutube && (
                            <a
                                href={recipe.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl group"
                            >
                                {/* YouTube Play Icon */}
                                <svg className="w-5 h-5 mr-1 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19.615 3.184c-1.042-.319-2.091-.468-3.136-.525C13.257 2.457 12 2.5 12 2.5s-1.257-.043-4.479.135C6.475 2.715 5.426 2.864 4.384 3.184c-1.127.345-2.046 1.152-2.38 2.378-.344 1.144-.467 2.368-.525 3.554C1.332 10.74 1.5 12 1.5 12s-.168 1.26-.001 2.923c.058 1.186.181 2.41.525 3.554.334 1.226 1.253 2.033 2.38 2.378 1.042.319 2.091.468 3.136.525 3.222.178 4.479.135 4.479.135s1.257.043 4.479-.135c1.042-.178 2.091-.319 3.136-.525 1.127-.345 2.046-1.152-2.38-2.378.344-1.144.467-2.368.525-3.554C22.668 13.26 22.5 12 22.5 12s.168-1.26.001-2.923c-.058-1.186-.181-2.41-.525-3.554-.334-1.226-1.253-2.033-2.38-2.378zM10 15.5V8.5L16 12l-6 3.5z" />
                                </svg>
                                {/* Text */}
                                <span className="whitespace-nowrap">Watch on YouTube</span>
                            </a>
                        )}

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}