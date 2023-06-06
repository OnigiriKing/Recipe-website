import Search from "./model/Search";
import Recipe from "./model/Recipe";
import * as searchView from "./view/SearchView";
import * as recipeView from "./view/RecipeView";
import { elements, loaderImg, removeLoaderImg } from "./view/base";

const state = {};

const searchControll = async () => {
  const query = searchView.getInput();
  if (query) {
    state.search = new Search(query);

    //   clean search
    searchView.clearInput();
    // clrear prev results
    searchView.clearResults();
    // loading image
    loaderImg(elements.recipeMenue);

    //   seqrch results
    await state.search.getRecipe();

    //   show result
    removeLoaderImg();
    searchView.renderResults(state.search.data);

    state.recipe = new Recipe(state.search.data.id, state.search.data.img);
  }
};

const displayRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    try {
      let img, arr, recipeName, timeToCook, servings, active;
      const base = document.getElementById(`${id}`);
      state.recipe = new Recipe(id);
      if (base) {
        recipeName = base.dataset.title;
        img = base.dataset.image;
        active = 1;
      } else {
        await state.recipe.getImgName();
        recipeName = state.recipe.title;
        img = state.recipe.image;
        active = 0;
      };

      console.log(state.recipe.image, 14);

      recipeView.clearRecipe();

      loaderImg(elements.itemMenu);

      await state.recipe.disRecipe();

      // ? Change unit
      state.recipe.changeUnit();

      state.recipe.calcTime();
      state.recipe.calcServings();
      arr = state.recipe.data;
      timeToCook = state.recipe.cookTime;
      servings = state.recipe.servings;

      state.recipe.changeValue();

      recipeView.clearRecipe();

      searchView.clearHighlight(active);

      searchView.highlightChosen(id, active);


      recipeView.displayChosenRecipe(
        arr,
        img,
        recipeName,
        timeToCook,
        servings
      );
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
};

// btn Search
elements.searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchControll();
});
elements.searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchControll();
  }
});

// page buttons
elements.sideMenu.addEventListener("click", (e) => {
  const btn = e.target.closest(".pageBtn");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();

    searchView.renderResults(state.search.data, goToPage);
  }
});

// window.addEventListener("hashchange",displayRecipe);

// ! add load here later
["hashchange"].forEach((event) =>
  window.addEventListener(event, displayRecipe)
);

elements.dayMode.addEventListener("click", searchView.changeTheme);

// !OLD VERSION OF THE RECIPE DISPLAY
// {
// elements.sideMenu.addEventListener("click", e => {
//   const btn = e.target.closest(".recepieList");
//   displayRecipe(btn);
// });
// ! old function
// const displayRecipe = async (btn) => {
//   let img, arr, recipeName, timeToCook, servings;
//   if (btn) {
//     img = btn.dataset.image;
//     recipeName = btn.dataset.title;
//     state.recipe = new Recipe(btn.id, img);

//     searchView.clearRecipe();

//     loaderImg(elements.itemMenu);

//     await state.recipe.disRecipe();
//     state.recipe.calcTime();
//     state.recipe.calcServings();
//     arr = state.recipe.data;
//     timeToCook = state.recipe.cookTime;
//     servings = state.recipe.servings;

//     // ! check
//     console.log(state.recipe.cookTime)

//     searchView.clearRecipe();

//     searchView.displayChosenRecipe(arr, img, recipeName, timeToCook, servings);
//   }
// }
// }
