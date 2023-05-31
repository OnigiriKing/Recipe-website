import Search from "./model/Search";
import Recipe from "./model/Recipe";
import * as searchView from "./view/SearchView";
import {
  elements,
  loaderImg,
  removeLoaderImg,
} from "./view/base";

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

const displayRecipe = async (btn) => {
  let img, arr, recipeName, timeToCook, servings;
  if (btn) {
    img = btn.dataset.image;
    recipeName = btn.dataset.title;
    state.recipe = new Recipe(btn.id, img);

    searchView.clearRecipe();

    loaderImg(elements.itemMenu);

    await state.recipe.disRecipe();
    state.recipe.calcTime();
    state.recipe.calcServings();
    arr = state.recipe.data;
    timeToCook = state.recipe.cookTime;
    servings = state.recipe.servings;
    
    // ! check
    console.log(state.recipe.cookTime)

    searchView.clearRecipe();


    searchView.displayChosenRecipe(arr, img, recipeName, timeToCook, servings);
  }
}



// btn Search
elements.searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchControll();
});

// page buttons 
elements.sideMenu.addEventListener("click", e => {
  const btn = e.target.closest(".pageBtn");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10)
    searchView.clearResults();

    searchView.renderResults(state.search.data, goToPage);
  }
});

// display recipe
elements.sideMenu.addEventListener("click", e => {
  const btn = e.target.closest(".recepieList");
  displayRecipe(btn);
});


elements.dayMode.addEventListener("click", searchView.changeTheme);
