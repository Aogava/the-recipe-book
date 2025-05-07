import { useState, useEffect } from "react";
import { Link } from "react-router";

import eraserIcon from "../assets/eraser-icon.svg";
import exploreIcon from "../assets/explore-icon.svg";

function RecipeFilters({ filters, setFilters }) {
  const [tempFilters, setTempFilters] = useState({
    ingredient: filters.ingredient || "",
    country: filters.country || "",
    category: filters.category || "",
  });

  useEffect(() => {
    setTempFilters({
      ingredient: filters.ingredient || "",
      country: filters.country || "",
      category: filters.category || "",
    });
  }, [filters]);

  return (
    <div className="mt-5">
      <h2 className="font-semibold text-3xl">Filters:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(3,1fr)_auto] xl:grid-cols-[repeat(4,auto)_1fr] items-center gap-2 text-xl">
        <input
          type="text"
          placeholder="Enter ingredient..."
          className="w-full focus:outline-none py-1 px-3 border-2 border-amber-700 rounded-full"
          value={tempFilters.ingredient}
          onInput={(e) =>
            setTempFilters((currentState) => {
              const newState = { ...currentState };
              newState.ingredient = e.target.value;
              return newState;
            })
          }
        />
        <input
          type="text"
          placeholder="Enter country..."
          className="w-full focus:outline-none py-1 px-3 border-2 border-amber-700 rounded-full"
          value={tempFilters.country}
          onInput={(e) =>
            setTempFilters((currentState) => {
              const newState = { ...currentState };
              newState.country = e.target.value;
              return newState;
            })
          }
        />
        <input
          type="text"
          placeholder="Enter Category..."
          className="w-full focus:outline-none py-1 px-3 border-2 border-amber-700 rounded-full"
          value={tempFilters.category}
          onInput={(e) =>
            setTempFilters((currentState) => {
              const newState = { ...currentState };
              newState.category = e.target.value;
              return newState;
            })
          }
        />
        <button
          className="justify-self-end sm:justify-self-start border-2 border-amber-700 rounded-full p-2 cursor-pointer duration-300 hover:bg-amber-600"
          onClick={() => setFilters(tempFilters)}
        >
          <img src={exploreIcon} alt="" className="" />
        </button>
        {/* <div className="hidden sm:block xl:hidden"></div> */}
        <Link
          to="/"
          className="justify-self-start xl:justify-self-end flex items-center gap-2 border-2 border-amber-700 rounded-full py-1 px-3 cursor-pointer duration-300 hover:bg-amber-600"
        >
          Reset all filters
          <img src={eraserIcon} alt="" className="" />
        </Link>
      </div>
    </div>
  );
}

export default RecipeFilters;
