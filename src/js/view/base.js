export const elements = {
  searchInput: document.querySelector(".searchInput"),
  searchBtn: document.querySelector(".searchBtn"),
  recipeMenue: document.getElementById("recipesMenu"),
  sideMenu: document.querySelector(".sideMenu"),
  itemMenu: document.querySelector(".itemMenu"),
  bodyWrapper: document.querySelector(".bodyWrapper"),
  dayNightBtnImg: document.querySelector(".dayMode img"),
  dayMode: document.querySelector(".dayMode"),
  plusMinus: document.querySelector(".plusMinusBtn"),
  shoppingList: document.querySelector(".shoppingList"),
  listItems: document.querySelector(".listItems"),
  deleteItemBtn: document.querySelector(".deleteResItem"),
  sideMenu: document.querySelector(".shoppingList"),
  addFav: document.querySelector(".favoriteRecipe"),
  likeBtn: document.querySelector(".favoriteList"),
};

export const elementsStrings = {
  loaderImg: "loadingImg",
};

export const loaderImg = (parent) => {
  const loader = `<div class="${elementsStrings.loaderImg}">
  <img src="./img/loading.gif" alt="Loading...">
  </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const removeLoaderImg = () => {
  const loader = document.querySelector(`.${elementsStrings.loaderImg}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
