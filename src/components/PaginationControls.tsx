import { Button } from "./ui/button";

interface PaginationControlsProps {
  totalRecipes: number;
  recipesPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ 
  totalRecipes, 
  recipesPerPage, 
  currentPage, 
  onPageChange 
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-18">
      <Button 
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      {pages.map(page => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "bg-orange-600 text-white" : ""}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}