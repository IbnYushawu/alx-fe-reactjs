import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(
    (state) => state.recommendations
  );
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div>
      <h2>Recommended for You</h2>

      {recommendations.length === 0 && (
        <p>No recommendations available.</p>
      )}

      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
