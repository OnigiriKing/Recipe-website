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
    .insertAdjacentHTML("afterbegin", ingHtml);
};
// displa ingr
export const displayChosenRecipe = (arr, image, name, time, serv) => {
  const html = `<div class="itemIgnPic"><h2 class="itemIngName">${name}</h2>
            <img src="${image}" alt="RecipePic">
            <div class="servingsPerson">
              <div class="timeToCook"><img src="./img/timeToCook.png" alt="CookingTime">${time}</div>
              <div class="servings">${serv} 
                <img src="./img/servings-img.png" alt="CookingTime">
              </div>
          </div>
          <ul class="ingridientList">
          </ul>
          </div>`;
  elements.itemMenu.insertAdjacentHTML("afterbegin", html);

  arr.forEach((e) => {
    addIngridients(e.name, e.amount.metric.value, e.amount.metric.unit);
  });
};
