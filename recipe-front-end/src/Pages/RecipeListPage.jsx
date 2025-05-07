import { useState, useEffect } from "react";
import { useParams } from "react-router";
import RecipeFilters from "../components/RecipeFilters";
import RecipeList from "../components/RecipeList";

function RecipeListPage() {
  const [filters, setFilters] = useState({
    ingredient: null,
    country: null,
    category: null,
  });
  const [hideAdditionalDetails, setHideAdditionalDetails] = useState(false);
  const { country, ingredient } = useParams();

  useEffect(() => {
    setFilters({
      ingredient: ingredient || null,
      country: country || null,
      category: null,
    });
  }, [country, ingredient]);

  useEffect(() => {
    // Hiding additional info because API doesn't give detailed info when using filter
    if (filters.ingredient || filters.country || filters.category) {
      setHideAdditionalDetails(true);
    } else {
      setHideAdditionalDetails(false);
    }
  }, [filters]);
  // console.log(filters);
  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-b from-yellow-400 to-yellow-200 font-main">
      <div className="max-w-[1920px] mx-auto px-[5%] pt-5 pb-[5%]">
        <h1 className="font-bold text-4xl text-center">The Recipe Book</h1>
        <RecipeFilters filters={filters} setFilters={setFilters} />

        <RecipeList
          filters={filters}
          hideAdditionalDetails={hideAdditionalDetails}
        />
      </div>
    </div>
  );
}

export default RecipeListPage;
