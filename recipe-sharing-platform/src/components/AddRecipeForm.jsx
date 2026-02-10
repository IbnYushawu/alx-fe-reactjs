import { useState } from "react"
import { useNavigate } from "react-router-dom"
import recipesData from "../data.json"

function AddRecipeForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [steps, setSteps] = useState("")
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!title.trim()) newErrors.title = "Title is required."
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required."
    if (ingredients.split("\n").length < 2)
      newErrors.ingredients = "Please include at least 2 ingredients."
    if (!steps.trim()) newErrors.steps = "Steps are required."

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validate() // Call validate function

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newRecipe = {
      id: recipesData.length + 1,
      title,
      summary: ingredients.split("\n")[0] || "",
      image: "https://via.placeholder.com/300x200",
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
    }

    recipesData.push(newRecipe)

    setTitle("")
    setIngredients("")
    setSteps("")
    setErrors({})

    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Recipe Title</label>
          <input
            type="text"
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Ingredients (one per line)
          </label>
          <textarea
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Preparation Steps (one per line)
          </label>
          <textarea
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.steps ? "border-red-500" : "border-gray-300"
            }`}
            rows={5}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipeForm
