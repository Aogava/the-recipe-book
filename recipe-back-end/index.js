import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Server running on port: " + process.env.PORT);
});
// Getting detailed info about specific meal
app.get("/get-meal", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/${process.env.API_KEY}/lookup.php?i=${req.query.mealID}`
    );

    const json = await response.json();
    // console.log(json);
    if (json.meals != null) {
      // Making client friendly response object
      const mealInfo = {
        preview: json.meals[0].strMealThumb,
        name: json.meals[0].strMeal,
        country: json.meals[0].strArea,
        category: json.meals[0].strCategory,
        instructions: json.meals[0].strInstructions,
        ingredients: Object.keys(json.meals[0])
          .filter(
            (keyName) =>
              keyName.includes("strIngredient") && json.meals[0][keyName]
          )
          .map((keyName) => json.meals[0][keyName]),
      };

      res.send(mealInfo);
    } else {
      res.status(404).json({ error: "No recipes with such filters" });
    }
  } catch (error) {
    console.error(error);
  }
});
// Getting list of all recipes
app.get("/get-all-recipes", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/${process.env.API_KEY}/search.php?s=`
    );

    const json = await response.json();
    // Making client friendly response object
    const recipesList = json.meals.map((meal) => ({
      id: meal.idMeal || null,
      name: meal.strMeal || null,
      category: meal.strCategory || null,
      country: meal.strArea || null,
      preview: meal.strMealThumb || null,
    }));

    res.send(recipesList);
  } catch (error) {
    console.error(error);
  }
});
// Getting filtered recipes
app.get("/get-filtered-recipes", async (req, res) => {
  // Adding necessary parts of filter
  let params = {};
  req.query.ingredient != "null" && (params.i = req.query.ingredient);
  req.query.country != "null" && (params.a = req.query.country);
  req.query.category != "null" && (params.c = req.query.category);

  let fetchString = `https://www.themealdb.com/api/json/v1/${
    process.env.API_KEY
  }/filter.php?${new URLSearchParams(params).toString()}`;

  // console.log(fetchString);
  try {
    const response = await fetch(fetchString);

    const json = await response.json();
    // console.log(json);
    if (json.meals != null) {
      // Making client friendly response object
      const recipesList = json.meals.map((meal) => ({
        id: meal.idMeal || null,
        name: meal.strMeal || null,
        category: meal.strCategory || null,
        country: meal.strArea || null,
        preview: meal.strMealThumb || null,
      }));

      res.send(recipesList);
    } else {
      res.status(404).json({ error: "No recipes with such filters" });
    }
  } catch (error) {
    console.error(error);
  }
});
