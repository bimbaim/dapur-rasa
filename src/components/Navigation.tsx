export function Navigation() {
  return (
    <nav className="fixed top-0 right-0 z-50 p-8">
      <div className="flex space-x-8">
        <a 
          href="#hero" 
          className="text-white hover:text-orange-200 transition-colors duration-300 font-medium"
        >
          Home
        </a>
        <a 
          href="#search" 
          className="text-white hover:text-orange-200 transition-colors duration-300 font-medium"
        >
          Recipes
        </a>
        <a 
          href="#results" 
          className="text-white hover:text-orange-200 transition-colors duration-300 font-medium"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}