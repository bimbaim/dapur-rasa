import { Button } from "./ui/button";

export function HeroSection() {
  const handleStartCooking = () => {
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="h-screen flex items-center justify-center relative snap-start"
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="text-center z-20 px-8 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-wide">
          DomusCulina
        </h1>
        <p className="text-xl md:text-2xl text-orange-100 mb-8 font-light">
          Discover the Art of Home Cooking
        </p>
        
        <div className="mb-10 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
            Share, discover, and create amazing home-cooked meals with a community of passionate food lovers. 
            Find your next favorite recipe or share your family's treasured dishes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-serif text-orange-200 mb-2">Free</h3>
              <p className="text-white/80">Recipe Sharing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-serif text-orange-200 mb-2">Easy</h3>
              <p className="text-white/80">Search & Filter</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-serif text-orange-200 mb-2">Community</h3>
              <p className="text-white/80">Driven Platform</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-orange-100">
            <span className="bg-orange-600/30 px-4 py-2 rounded-full border border-orange-400/30">
              📝 Share Recipes
            </span>
            <span className="bg-orange-600/30 px-4 py-2 rounded-full border border-orange-400/30">
              🔍 Smart Search
            </span>
            <span className="bg-orange-600/30 px-4 py-2 rounded-full border border-orange-400/30">
              ⭐ Rate & Review
            </span>
            <span className="bg-orange-600/30 px-4 py-2 rounded-full border border-orange-400/30">
              🌍 Global Community
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleStartCooking}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore Recipes
          </Button>
          <Button 
            variant="outline"
            onClick={handleStartCooking}
            className="bg-white/20 hover:bg-white/30 text-white border-white/40 hover:border-white/60 px-8 py-4 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
          >
            Share Your Recipe
          </Button>
        </div>
      </div>
    </section>
  );
}