import { nanoid } from "nanoid";

export default class List {
  constructor() {
    this.items = [];
  }
  addItems(value, unit, ing) {
    const item = {
      value,
      unit,
      ing,
      id: nanoid(6),
    };
    this.items.push(item)
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id == id)
    this.items.splice(index , 1)
  }

  updateValue(id, newValue) {
    this.items.find(el => el.id == id).value = newValue
  }
}
