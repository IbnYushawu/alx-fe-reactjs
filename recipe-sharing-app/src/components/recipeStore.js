import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  favorites: [],
  recommendations: [],

  /* ---------- Recipes ---------- */
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      favorites: state.favorites.filter((fid) => fid !== id),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  /* ---------- Search ---------- */
  setSearchTerm: (term) => set({ searchTerm: term }),

  getFilteredRecipes: () => {
    const { recipes, searchTerm } = get();
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  /* ---------- Favorites ---------- */
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  /* ---------- Recommendations ---------- */
  generateRecommendations: () => {
    const { recipes, favorites } = get();

    const recommended = recipes.filter(
      (recipe) =>
        !favorites.includes(recipe.id) &&
        favorites.length > 0 &&
        recipe.title.length % 2 === favorites.length % 2
    );

    set({ recommendations: recommended });
  },
}));
