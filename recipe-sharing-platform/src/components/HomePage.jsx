import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import recipesData from "../data.json"

function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRecipes(recipesData)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🍲 Recipe Sharing Platform
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{recipe.summary}</p>

              <Link
                to={`/recipe/${recipe.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                View Recipe →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
