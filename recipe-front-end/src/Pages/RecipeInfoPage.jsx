import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import RecipeList from "../components/RecipeList";

function RecipeInfoPage() {
  const [currentMeal, setCurrentMeal] = useState({
    preview: null,
    name: null,
    country: null,
    category: null,
    ingredients: null,
    instructions: null,
  });
  const navigate = useNavigate();
  // Getting current meal id
  const mealID = useParams().id;
  // Getting detailed info about meal from server
  const fetchMeal = async (mealID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/get-meal?mealID=${mealID}`
      );
      const json = await response.json();
      // If recipe doesn't exist, then redirect user to main page
      if (response.status == 404) {
        navigate("/");
      }
      // If recipe exists, then showing it
      else {
        setCurrentMeal(json);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Every time when mealID changes, request to server to refresh info
  useEffect(() => {
    fetchMeal(mealID);
  }, [mealID]);

  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-b from-yellow-400 to-yellow-200 font-main">
      <div className="max-w-[1920px] mx-auto px-[5%] pt-5 pb-[5%]">
        <div className="grid sm:grid-cols-[auto_1fr] items-center gap-5">
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
              filters={{ category: currentMeal.category }}
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
