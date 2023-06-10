import { elements } from "./base";

export const addItemList = (item) => {
  const newHtml = `<div class="items" data-itemid ="${item.id}"><div><input class='itemInput' type="number" step="${item.value}" value="${item.value}"><p>${item.unit}</p></div>
            <p>${item.ing}</p>
            <button class="deleteResItem"><img class="deleteResItem" src="./img/delete_btn.png" alt=""></button></div>`;

  elements.listItems.insertAdjacentHTML("beforeend", newHtml);
};

export const deleItem = (id) => {
  const item = document.querySelector(`[data-itemid ="${id}"]`);
  item.parentElement.removeChild(item)
}

// export const addItemList = (val, unit, name, id) => {
//   const newHtml = `<div class="listItems"></div>`;
//   elements.shoppingList.insertAdjacentHTML("beforeend", newHtml);
//   listItem(val, unit, name, id);
// };
