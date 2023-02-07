import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectRecipes } from "./store/recipesReducer";

import { updateStorageList } from "./utils/storage";

import Recipes from "./components/recipes/Recipes";
import Recipe from "./components/recipe/Recipe";
import RecipeForm from "./components/recipe-form/RecipeForm";
import RecipeRemove from "./components/recipe-remove/RecipeRemove";
import RecipeLoad from "./components/recipe-load/RecipeLoad";
import Error from "./components/error/Error";
import { Button } from "./components/shared";

import "./App.scss";

const App = () => {
  let recipes = useSelector(selectRecipes);
  const [showNav, setShowNav] = useState(false);

  const { pathname } = useLocation();
  const scrollArea = useRef();

  useEffect(() => {
    updateStorageList("recipes", recipes);
  }, [recipes]);

  useEffect(() => {
    scrollArea.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const handleFilter = () => setShowNav((showNav) => !showNav);

  return (
    <div className="recipe-book">
      <div className="recipe-book__content" ref={scrollArea}>
        <header className="recipe-book__header header">
          <div className="header__menu">
            <Routes>
              {recipes.length > 0 && (
                <>
                  <Route
                    path="/"
                    element={
                      <Button callback={handleFilter}>
                        {showNav ? "Hide" : "Show"} Filter
                      </Button>
                    }
                  />
                  <Route
                    path="/recipe/:id"
                    element={
                      <>
                        <Link to="./edit">
                          <Button>Edit Recipe</Button>
                        </Link>
                        <Link to="./remove">
                          <Button>Remove Recipe</Button>
                        </Link>
                      </>
                    }
                  />
                  {["/recipe/:id/edit", "/recipe/:id/remove", "/add/load"].map(
                    (path, index) => (
                      <Route
                        key={index}
                        path={path}
                        element={
                          <Link to=".." relative="path">
                            <Button>Back</Button>
                          </Link>
                        }
                      />
                    )
                  )}
                </>
              )}
              <Route
                path="/add"
                element={
                  <Link to="./load">
                    <Button>Load Recipe</Button>
                  </Link>
                }
              />
              <Route path="*" element={null} />
            </Routes>
          </div>

          <div className="header__menu">
            {pathname !== "/" && (
              <Link to="/">
                <Button>All Recipes</Button>
              </Link>
            )}

            <Routes>
              {["/", "/recipe/:id", "/recipe/:id/remove", "/add/load"].map(
                (path, index) => (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Link to="/add">
                        <Button>Add New Recipe</Button>
                      </Link>
                    }
                  />
                )
              )}
              <Route path="*" element={null} />
            </Routes>
          </div>
        </header>

        <main className="recipe-book__body">
          <Routes>
            <Route path="/" element={<Recipes showNav={showNav} />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/add" element={<RecipeForm action="add" />} />
            <Route
              path="/recipe/:id/edit"
              element={<RecipeForm action="edit" />}
            />
            <Route path="/recipe/:id/remove" element={<RecipeRemove />} />
            <Route path="/add/load" element={<RecipeLoad />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
