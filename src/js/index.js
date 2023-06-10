import Search from "./model/Search";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Likes";
import * as searchView from "./view/SearchView";
import * as recipeView from "./view/RecipeView";
import * as listView from "./view/ListView";
import * as likesView from "./view/LikesView";
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
        state.recipe.image = img;
        active = 1;
      } else {
        await state.recipe.getImgName();
        recipeName = state.recipe.title;
        img = state.recipe.image;
        active = 0;
      }

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
        servings,
        state.likes.hasLike(id),
      );
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
};


// Add recipe in a list
const addRecipeInList = () => {
  if (!state.list) {
    state.list = new List();
  }
  state.recipe.data.forEach((el) => {
    state.list.addItems(el.amount.metric.value, el.amount.metric.unit, el.name);
  });
  console.log(state.list.items);
  state.list.items.forEach((el) => {
    listView.addItemList(el);
  });
};

const controllLike = () => {
  const newID = state.recipe.id;
  if (!state.likes) {
    state.likes = new Like();
  }
  if (!state.likes.hasLike(newID)) {
    const newLike = state.likes.addLike(
      state.recipe.title,
      state.recipe.image,
      newID
    );
    likesView.toggleLikeBtn(true)
  } else {
    state.likes.deleteItem(newID);
    likesView.toggleLikeBtn(false);
  }
   likesView.likeBtnVisability(state.likes.getLikesNumber());
};

//? load saved info on load
window.addEventListener('load', () => {
  state.likes = new Like();
  state.likes.readStorage();
  likesView.likeBtnVisability(state.likes.getLikesNumber());
  console.log(state.likes);
})

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

// ! add load here later
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, displayRecipe)
);

elements.dayMode.addEventListener("click", searchView.changeTheme);

elements.itemMenu.addEventListener("click", (e) => {
  if (e.target.matches(".incBtn")) {
    state.recipe.ingridienceChange("inc");
    recipeView.updateIngValue(state.recipe);
  } else if (e.target.matches(".decBtn") && state.recipe.servings > 1) {
    state.recipe.ingridienceChange("dec");
    recipeView.updateIngValue(state.recipe);
  } else if (e.target.matches(".addRecipeBtn")) {
    addRecipeInList();
  } else if (e.target.matches(".favoriteRecipeBtn")) {
    controllLike();
  }
});

elements.sideMenu.addEventListener("click", (e) => {
  const id = e.target.closest(".items").dataset.itemid;
  if (e.target.matches(".deleteResItem")) {
    listView.deleItem(id);
    const index = state.list.items.findIndex((el) => el.id == id);
    state.list.items.splice(index, 1);
    console.log(state.list);
  } else if (e.target.matches(".itemInput")) {
    const val = e.target.value;
    state.list.updateValue(id, val);
    console.log(state.list);
  }
});
