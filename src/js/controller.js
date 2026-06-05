import * as model from "./model.js";
import { MODAL_CLOSE_SECS } from "./config.js";
import recipeView from "./view/recipeView.js"; //parcel 2
import searchView from "./view/searchView.js";
import resultView from "./view/resultView.js";
import BookMarkView from "./view/bookmarks.js";
import addRecipeView from "./view/addRecipeView.js";
import paginationView from "./view/paginationView.js";

// import icons from "../img/icons.svg"; // parcel 1
// import "core-js/stable";
import "core-js/stable";
import "regenerator-runtime/runtime";
// import { async } from "regenerator-runtime";

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };
// if (module.hot) {
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // updating bookmarksView
    BookMarkView.update(model.states.bookmarks);

    // 0 update result view to mark selected searach result

    //1  loading recipe
    await model.loadRecipes(id);
    // const { recipe } = model.states;

    // rending recipe
    recipeView.render(model.states.recipe);
    // const recipeView = new recipeView(model.states.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlsearchRe = async function () {
  try {
    resultView.renderSpinner();

    const query = searchView.getquery();
    // console.log(query);
    if (!query) return;

    await model.loadSearchRe(query);

    // resultView.render(model.states.search.result)

    resultView.render(model.getSearchResultsPage(3));

    // pagination button

    paginationView.render(model.states.search);
  } catch (err) {
    console.log(" Error in controlsearchRe:", err);
  }
};

const controlBtnPagination = function (gotoBtnPage) {
  // console.log(gotoBtnPage);
  resultView.render(model.getSearchResultsPage(gotoBtnPage));

  // render new pagination
  paginationView.render(model.states.search);
};

const controlUpdateRecipe = function (newServings) {
  // update the recipe serving (state)
  model.updateRecipeServings(newServings);
  // recipeView.render(model.states.recipe);
  recipeView.update(model.states.recipe);

  // update the recipe VIEW
  BookmarkView.render(model.states.bookmarks);
};

const controlAddBookmarks = function () {
  if (!model.states.recipe.bookmarked) {
    model.addBookmark(model.states.recipe);
  } else {
    model.deleteBookmark(model.states.recipe.id);
  }

  recipeView.update(model.states.recipe);
  BookMarkView.render(model.states.bookmarks);
};

const controlBookmarks = function () {
  BookMarkView.render(model.states.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // upload the new recipe data
    await model.upLoadRecipe(newRecipe);
    console.log(model.states.recipe);

    // render recipe
    recipeView.render(model.states.recipe);

    // sucess message ,ni edu
    addRecipeView.renderMessage();

    // render bookmarks view
    BookMarkView.render(model.states.bookmarks);

    // change ID in URL
    window.history.pushState(null, "", `#${model.states.recipe.id}`);
    // window.history.back();
    // close form window
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SECS * 1000);
  } catch (err) {
    console.error("this ERROR MESSAGE  ", err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  BookMarkView.addhandlerRender(controlBookmarks);
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateRecipe);
  recipeView.addhandlerBookMarks(controlAddBookmarks);
  searchView.addSubmitSearch(controlsearchRe);
  paginationView.addhandlerClick(controlBtnPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log("WELCOME USERS!");
};
init();
// window.addEventListener("hashchange", showRecipes);
// window.addEventListener("load", showRecipes);
