import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import recipesData from "../data.json"

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const foundRecipe = recipesData.find((r) => r.id === parseInt(id))
    setRecipe(foundRecipe)
  }, [id])

  if (!recipe) return <p className="text-center mt-10">Recipe not found.</p>

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 max-w-4xl mx-auto">
      <Link
        to="/"
        className="text-blue-600 font-medium hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

          {/* Ingredients Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {(recipe.ingredients || ["1 cup example ingredient"]).map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </section>

          {/* Instructions Section */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700">
              {(recipe.instructions || [
                "Step 1: Example instruction",
                "Step 2: Example instruction",
              ]).map((step, index) => (
                <li key={index} className="mb-1">
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
