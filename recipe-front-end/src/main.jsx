import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import RecipeListPage from "./Pages/RecipeListPage.jsx";
import RecipeInfoPage from "./Pages/RecipeInfoPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<RecipeListPage />} />
        <Route path="country">
          <Route path=":country" element={<RecipeListPage />} />
        </Route>
        <Route path="ingredient">
          <Route path=":ingredient" element={<RecipeListPage />} />
        </Route>

        <Route path="meal">
          <Route path=":id" element={<RecipeInfoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
