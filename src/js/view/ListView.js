import { elements } from "./base";

export const addItemList = (val, unit, name, id) => {
  const newHtml = `<div class="items" id ="${id}"><div><input type="text" value="${val}"><p>${unit}</p></div>
            <p>${name}</p>
            <button class="deleteResItem"><img src="./img/delete_btn.png" alt=""></button></div>`;

  elements.listItems.insertAdjacentHTML("beforeend", newHtml);
};

// export const addItemList = (val, unit, name, id) => {
//   const newHtml = `<div class="listItems"></div>`;
//   elements.shoppingList.insertAdjacentHTML("beforeend", newHtml);
//   listItem(val, unit, name, id);
// };
