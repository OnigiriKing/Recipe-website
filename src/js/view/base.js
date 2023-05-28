export const elements = {
  searchInput: document.querySelector(".searchInput"),
  searchBtn: document.querySelector(".searchBtn"),
  recipeMenue: document.getElementById("recipesMenu"),
};

export const elementsStrings = {
  loaderImg: "loadingImg",
};

export const loaderImg = parant => {
  const loader = `<div class="${elementsStrings.loaderImg}">
  <img src="./img/loading.gif" alt="Loading...">
  </div>`;
  parant.insertAdjacentHTML("afterbegin", loader);
};

export const removeLoaderImg = () => {
  const loader = document.querySelector(`.${elementsStrings.loaderImg}`);
  if(loader) {
    loader.parentElement.removeChild(loader)
  }
}