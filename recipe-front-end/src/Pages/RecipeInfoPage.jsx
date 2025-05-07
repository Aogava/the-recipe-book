import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import RecipeList from "../components/RecipeList";

function RecipeInfoPage() {
  const [currentMeal, setCurrentMeal] = useState({
    preview: null,
    name: null,
    country: null,
    ingredients: null,
    instructions: null,
  });
  const mealID = useParams().id;
  // console.log(currentMeal);
  const fetchMeal = async (mealID) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
      );
      const json = await response.json();

      const newMealState = {
        preview: json.meals[0].strMealThumb,
        name: json.meals[0].strMeal,
        country: json.meals[0].strArea,
        instructions: json.meals[0].strInstructions,
        ingredients: Object.keys(json.meals[0])
          .filter(
            (keyName) =>
              keyName.includes("strIngredient") && json.meals[0][keyName]
          )
          .map((keyName) => json.meals[0][keyName]),
      };
      setCurrentMeal(newMealState);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeal(mealID);
  }, [mealID]);

  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-b from-yellow-400 to-yellow-200 font-main">
      <div className="max-w-[1920px] mx-auto px-[5%] pt-5 pb-[5%]">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <Link to="/" className="font-bold text-3xl hover:underline">
            Back
          </Link>
          <h1 className="font-bold text-4xl text-center">{currentMeal.name}</h1>
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 items-start gap-5">
          <img src={currentMeal.preview} alt="" className="w-full rounded-xl" />
          <div className="">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-3xl">Country:</h2>
              <Link
                to={`/country/${currentMeal.country}`}
                className="text-2xl hover:underline"
              >
                {currentMeal.country}
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold text-3xl">Ingredients:</h2>
              <div className="flex flex-wrap gap-2">
                {currentMeal.ingredients?.map((item) => (
                  <Link
                    to={`/ingredient/${item}`}
                    key={item}
                    className="text-2xl hover:underline"
                  >
                    {item},
                  </Link>
                ))}
              </div>
            </div>
            <div className="">
              <h2 className="font-bold text-3xl">Instructions:</h2>
              <p className="text-2xl">{currentMeal.instructions}</p>
            </div>
          </div>
          <aside className="col-span-full 2xl:col-span-1">
            <RecipeList
              filters={{ country: currentMeal.country }}
              listHeading={"Same category:"}
              listOuterClasses={
                "mt-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-1 gap-2"
              }
              hideAdditionalDetails={true}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default RecipeInfoPage;
