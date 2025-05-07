import { useEffect, useState } from "react";
import { Link } from "react-router";

function RecipeList({
  filters,
  listHeading,
  listOuterClasses,
  hideAdditionalDetails,
}) {
  const [recipeList, setRecipeList] = useState([]);

  // console.log(filters);
  const fetchRecipes = async (filters) => {
    let fetchString = "";
    if (!filters.ingredient && !filters.country && !filters.category) {
      fetchString = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    } else {
      fetchString = "https://www.themealdb.com/api/json/v1/1/filter.php?";

      filters.ingredient &&
        (fetchString += "i=" + filters.ingredient.replace(" ", "+"));
      filters.country &&
        (fetchString += "a=" + filters.country.replace(" ", "+"));
      filters.category &&
        (fetchString += "c=" + filters.category.replace(" ", "+"));
    }
    console.log(fetchString);
    try {
      const response = await fetch(fetchString);
      const json = await response.json();
      const newRecipeList = json.meals.map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory || null,
        country: meal.strArea || null,
        preview: meal.strMealThumb,
      }));
      setRecipeList(newRecipeList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes(filters);
  }, [filters]);

  return (
    <div className="mt-5">
      <h2 className="font-semibold text-3xl">
        {listHeading ? listHeading : "List:"}
      </h2>
      <div
        className={
          listOuterClasses
            ? listOuterClasses
            : "mt-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2"
        }
      >
        {recipeList.map((meal) => (
          <Link
            to={`/meal/${meal.id}`}
            className="bg-amber-50 hover:bg-amber-100 duration-300 cursor-pointer p-3 rounded-xl flex gap-2"
            key={meal.id}
            // meal-id={meal.id}
          >
            <img
              src={meal.preview}
              alt=""
              className="w-30 sm:w-40 rounded-xl"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-2xl">{meal.name}</h3>
              {hideAdditionalDetails ? null : (
                <>
                  <h4 className="font-medium text-xl">
                    Category: {meal.category}
                  </h4>
                  <h5 className="font-medium text-lg">
                    Country: {meal.country}
                  </h5>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
