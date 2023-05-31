import { elements } from "./base";

export const getInput = () => {
  return elements.searchInput.value;
};

export const clearInput = () => {
  elements.searchInput.value = "";
};

// clear all recipes (left)
export const clearResults = () => {
  elements.recipeMenue.innerHTML = "";
};

// clear chosen recipe (middle) area 
export const clearRecipe = () => {
  elements.itemMenu.innerHTML = "";
};


// linit recipe name
const limitChar = (name, limit = 17) => {
  const newTitle = [];
  name.split(" ").reduce((acc, cur) => {
    if (acc + cur.length <= limit) {
      newTitle.push(cur);
    }
    return acc + cur.length;
  }, 0);
  return `${newTitle.join(" ")}...`;
};

// show recipe
const renderRecepie = (recepie) => {
  const newHtml = `<button class="recipeListBtn" id= "btn-${
    recepie.id
  }"><li class="recepieList" id='${recepie.id}' data-image= ${
    recepie.image
  } data-title = '${recepie.title}'
  ><h5 class="recepieListName">${limitChar(
    recepie.title
  )}</h5><div class="recepieListImg"><img src="${
    recepie.image
  }" alt="img"></div></li></button>`;
  elements.recipeMenue.insertAdjacentHTML("afterbegin", newHtml);
};

// to create btn next/prev
const createPageBtn = (page, type) => {
  if (type == "prev" || type == "next") {
    return `<button class="${
      type === "prev" ? "prev" : "next"
    }PageBtn pageBtn" data-goto = ${type === "prev" ? page - 1 : page + 1}>
              ${
                type === "prev"
                  ? `<=Page ${page - 1}`
                  : type === "next"
                  ? `Page ${page + 1} =>`
                  : ""
              }</button>`;
  }
  if (type == "both") {
    return `<div class="resultPages">
          <button class="prevPageBtn pageBtn" data-goto = ${page - 1}>
              ${`<= Page ${page - 1}`}
          </button>
            <button class="nextPageBtn pageBtn" data-goto = ${page + 1}>
               ${`Page ${page + 1} =>`}
          </button>
        </div>`;
  }
};

// display next/prev btns
const renderButtons = (page, numRes, resOnPage) => {
  const pages = Math.ceil(numRes / resOnPage);
  let btn;
  if (page == 1 && pages > 1) {
    btn = createPageBtn(page, "next");
  } else if (page < pages) {
    btn = createPageBtn(page, "both");
  } else if (page == pages && pages > 1) {
    btn = createPageBtn(page, "prev");
  }
  elements.recipeMenue.insertAdjacentHTML("beforeend", btn);
};

// show resulst on page
export const renderResults = (recipes, page = 1, resultsOnPage = 3) => {
  const start = (page - 1) * resultsOnPage;
  const end = page * resultsOnPage;
  recipes.slice(start, end).forEach(renderRecepie);
  renderButtons(page, recipes.length, resultsOnPage);
};

// add every ingr
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
}
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

    arr.forEach(e => {
      addIngridients(
        e.name,
        e.amount.metric.value,
        e.amount.metric.unit
      );
    })
};


export const changeTheme = () => {
  const bgStyle = elements.bodyWrapper.style;
  if (bgStyle.backgroundImage.includes("dark")) {
    bgStyle.backgroundImage = 'url("./img/bg-pic-light.jpg")';
    elements.dayNightBtnImg.src = "./img/light-btn.png";
  } else {
    bgStyle.backgroundImage = 'url("./img/bg-pic-dark.jpg")';
    elements.dayNightBtnImg.src = "./img/dark-btn.png";
  }
}
