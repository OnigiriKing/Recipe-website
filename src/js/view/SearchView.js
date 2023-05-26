import { elements } from "./base";

export const getInput = () => {
  return elements.searchInput.value;
};

const renderRecepie = (recepie) => {
  const newHtml = `<li class="recepieList" id='${recepie.id}'><h3 class="recepieListName">${recepie.title}</h3><img class="recepieListImg" src="${recepie.image}" alt="img"></li>`;
  elements.recipeMenue.insertAdjacentHTML("afterbegin", newHtml);
};

export const renderResults = recipes => {
    console.log(recipes);
  recipes.forEach(renderRecepie);
};
