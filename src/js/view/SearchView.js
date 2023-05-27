import { elements } from "./base";

export const getInput = () => {
  return elements.searchInput.value;
};

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults =() => {
    elements.recipeMenue.innerHTML = ""
}

const renderRecepie = (recepie) => {
  const newHtml = `<button class="recipeListBtn" id= "btn-${recepie.id}"><li class="recepieList" id='${recepie.id}'><h5 class="recepieListName">${recepie.title}</h5><div class="recepieListImg"><img src="${recepie.image}" alt="img"></div></li></button>`;
  elements.recipeMenue.insertAdjacentHTML("afterbegin", newHtml);
};

export const renderResults = recipes => {
    console.log(recipes);
  recipes.forEach(renderRecepie);
};
