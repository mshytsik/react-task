import { getStorageList, updateStorageList } from "./storage";
import localStorage from "./__mocks__/localStorage";

describe("test storage utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("get empty storage list", () => {
    const recipes = getStorageList("recipes");
    expect(recipes).toEqual([]);
  });

  test("get filled storage list", () => {
    localStorage.populate();
    const recipes = getStorageList("recipes");
    expect(recipes).toEqual([
      { id: 862993, name: "Roasted Eggplant With Tahini" },
    ]);
  });

  test("update empty storage list", () => {
    const newRecipes = [{ id: 10000, name: "New Recipe" }];
    updateStorageList("recipes", newRecipes);

    const recipes = getStorageList("recipes");
    expect(recipes).toEqual([{ id: 10000, name: "New Recipe" }]);
  });

  test("update filled storage list", () => {
    localStorage.populate();
    let recipes = getStorageList("recipes");

    const newRecipes = [...recipes, { id: 10000, name: "New Recipe" }];
    updateStorageList("recipes", newRecipes);

    recipes = getStorageList("recipes");
    expect(recipes).toEqual([
      { id: 862993, name: "Roasted Eggplant With Tahini" },
      { id: 10000, name: "New Recipe" },
    ]);
  });
});
