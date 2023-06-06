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
  ><a class="recepieListA" href='#${
    recepie.id
  }'><h5 class="recepieListName">${limitChar(
    recepie.title
  )}</h5><div class="recepieListImg"><img src="${
    recepie.image
  }" alt="img"></div></a></li></button>`;
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
export const renderResults = (recipes, page = 1, resultsOnPage = 5) => {
  const start = (page - 1) * resultsOnPage;
  const end = page * resultsOnPage;
  recipes.slice(start, end).forEach(renderRecepie);
  renderButtons(page, recipes.length, resultsOnPage);
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


export const highlightChosen = (id, active) => {
  if (active == 1) {
    document.querySelector(`a[href='#${id}']`).style.backgroundColor = "gray";
  }
};

export const clearHighlight = (active) => {
  if (active == 1) {
    const elements = document.querySelectorAll(".recepieListA");
    elements.forEach(e => {
      e.style.background = "white";
    })
  }
};