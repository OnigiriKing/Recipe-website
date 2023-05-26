import Search from './model/Search'
import * as searchView from "./view/SearchView";
import {elements} from './view/base'

const state = {
}


const searchControll = async () => {
    const query = searchView.getInput();
    if (query) {
      state.search = new Search(query);

      await state.search.getRecipe();


      searchView.renderResults(state.search.data);
    }
}

elements.searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchControll();
});

// elements.searchBtn.addEventListener("click", (e) => {
//   console.log(getInput());
// });

// ? async version
// async function getRecipe() {
//   const recipeID = 648257;
//   const apiUrl = `https://api.spoonacular.com/recipes/${recipeID}/ingredientWidget.json`;
//   const recipeInput = "";
//   const apiKey = "c062fd2c1f8546059535d4d223d1334f";
//   const fullLink = `${apiUrl}?apiKey=${apiKey}`;

//   try {
//     const result = await fetch(fullLink);
//     const data = await result.json();
//     console.log(data);
//   } catch (err) {
//     console.log(error);
//   }
// }

// document.querySelector(".searchBtn").addEventListener("click", getRecipe);





// ! dark/light btn
// function changeTheme() {
//   let bgStyle, btnStyle;
//   bgStyle = document.querySelector(".bodyWrapper").style;
//   btnStyle = document.querySelector(".dayMode img");
//   if (bgStyle.backgroundImage.includes("dark")) {
//     bgStyle.backgroundImage = 'url("./img/bg-pic-light.jpg")';
//     btnStyle.src = "./img/light-btn.png";
//   } else {
//     bgStyle.backgroundImage = 'url("./img/bg-pic-dark.jpg")';
//     btnStyle.src = "./img/dark-btn.png";
//   }
// }

// document.querySelector(".dayMode").addEventListener("click", changeTheme);
