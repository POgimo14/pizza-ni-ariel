import { async } from "regenerator-runtime/runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
// import { getJSON, AJAXREQ } from "./helpers.js";
import { AJAXREQ } from "./helpers.js";

export const states = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObj = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipes = async function (id) {
  try {
    const data = await AJAXREQ(`${API_URL}/${id}?key=${KEY}`);
    states.recipe = createRecipeObj(data);
    if (states.bookmarks.some((bookmark) => bookmark.id === id))
      states.recipe.bookmarked = true;
    else states.recipe.bookmarked = false;
    console.log(states.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchRe = async function (query) {
  try {
    states.search.query = query;
    const data = await AJAXREQ(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    states.search.results = data.data.recipes.map((recP) => ({
      id: recP.id,
      title: recP.title,
      publisher: recP.publisher,
      image: recP.image_url,
      ...(recP.key && { key: recP.key }),
    }));
    states.search.page = 1;
  } catch (err) {
    console.error(`${err} ❌❌`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = states.search.page) {
  states.search.page = page;

  const starts = (page - 1) * states.search.resultsPerPage; // 0;
  const ends = page * states.search.resultsPerPage; // 9;
  return states.search.results.slice(starts, ends);
};

export const updateRecipeServings = function (newServings) {
  states.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / states.recipe.servings;
    //newQT = oldQT newServings / oldServings  /// 2 / 8 / 4 = 4
  });

  states.recipe.servings = newServings;
};

const controlAddBookmarks = function () {
  // 1. Add or remove bookmark
  if (!model.states.recipe.bookmarked) {
    model.addBookmarks(model.states.recipe);
  } else {
    model.deleteBookmark(model.states.recipe.id);
  }

  // 2. Update recipe view
  recipeView.update(model.states.recipe);
};

// local storage
const localBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(states.bookmarks));
};

// add bookmarks
export const addBookmark = function (recipe) {
  states.bookmarks.push(recipe);

  if (recipe.id === states.recipe.id) states.recipe.bookmarked = true;
  localBookmarks();
};

// delete book marks
export const deleteBookmark = function (id) {
  // delete bookmarks
  const index = states.bookmarks.findIndex((element) => element.id === id);
  states.bookmarks.splice(index, 1);

  // mark current recipe NOT bookmark
  if (id === states.recipe.id) states.recipe.bookmarked = false;
  localBookmarks();
};

const init = function () {
  const storages = localStorage.getItem("bookmarks");

  if (storages) {
    states.bookmarks = JSON.parse(storages);
  }
};

init();

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
// clearBookmars();

export const upLoadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArray = ing[1].split(",").map((el) => el.trim());
        // const ingArray = ing[1].replaceAll(" ", "").split(",");

        if (ingArray.length !== 3) throw new Error("noo ingredients for ");

        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    console.log(newRecipe);
    const data = await AJAXREQ(`${API_URL}?key=${KEY}`, recipe);
    states.recipe = createRecipeObj(data);
    // add bookmark
    addBookmark(states.recipe);
  } catch (err) {
    throw err;
  }
};
