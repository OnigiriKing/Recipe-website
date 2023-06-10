// add every ingr
import { elements } from "./base";

// clear chosen recipe (middle) area
export const clearRecipe = () => {
  elements.itemMenu.innerHTML = "";
};

const addIngridients = (name, value, unit) => {
  const ingHtml = `<li class="ingridient">
              <h4 class="ingName">${name}</h4>
              <p class="ingCount">${
                value > 1 ? Math.ceil(value) : value
              } ${unit}</p>
            </li>`;

  document
    .querySelector(".ingridientList")
    .insertAdjacentHTML("beforeend", ingHtml);
};
// displa ingr
export const displayChosenRecipe = (arr, image, name, time, serv, isLiked = false) => {
  const html = `<div class="itemIgnPic"><h2 class="itemIngName">${name}</h2>
            <img src="${image}" alt="RecipePic">
            <div class="servingsPerson">
              <div class="timeToCook"><img src="./img/timeToCook.png" alt="CookingTime">${time}</div>
              <div class="servImage"><img src="./img/servings-img.png" alt="servings"></div>
              <div class="servings">${serv} servings
              </div>
              <div class="plusMinusBtn">
                <button><img class="decBtn" src="./img/minus_btn.png" alt=""></button><button><img class="incBtn" src="./img/plus_btn.png" alt=""></button>
              </div>
          </div>
          <ul class="ingridientList">
          </ul>
          </div>
          <div class= "addRecipeDiv">
            <button class="addRecipeBtn">Add recipe in grocery list</button>
            <button class="favoriteRecipe">
            <img class="favoriteRecipeBtn ${isLiked ? 'darkLike' : ''}" src="./img/fav-img.png" alt="Favorite"/>
          </button>
          </div>`;
  elements.itemMenu.insertAdjacentHTML("afterbegin", html);

  arr.forEach((e) => {
    addIngridients(e.name, e.amount.metric.value, e.amount.metric.unit);
  });
};


// update new servings
export const updateIngValue = (recipe) => {
  document.querySelector(
    ".servings"
  ).textContent = `${recipe.servings} servings`;

  // ? reusable code. Results are turned into array and them forEach is used
  const countElements = Array.from(document.querySelectorAll(".ingCount"));
  console.log(recipe.data[0]);
  countElements.forEach((el, i) => {
    const unit = recipe.data[i].amount.metric.unit;
    el.textContent = `${
      recipe.data[i].amount.metric.value > 1
        ? Math.ceil(recipe.data[i].amount.metric.value)
        : recipe.data[i].amount.metric.value
    } ${unit}`;
  });
};
