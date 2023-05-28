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

const limitChar = (name, limit=17) => {
  const newTitle = [];
  name.split(' ').reduce((acc, cur) => {
    if (acc + cur.length <= limit) {
      newTitle.push(cur);
    }
    return acc + cur.length;
  }, 0)
  return `${newTitle.join(' ')}...`;
}

const renderRecepie = (recepie) => {
  const newHtml = `<button class="recipeListBtn" id= "btn-${recepie.id}"><li class="recepieList" id='${recepie.id}'><h5 class="recepieListName">${limitChar(recepie.title)}</h5><div class="recepieListImg"><img src="${recepie.image}" alt="img"></div></li></button>`;
  elements.recipeMenue.insertAdjacentHTML("afterbegin", newHtml);
};

export const renderResults = recipes => {
    console.log(recipes);
  recipes.forEach(renderRecepie);
};
