import axios from "axios";
import { apiKey } from "../config";

export default class Recipe {
  constructor(id, pic) {
    this.id = id;
    this.pic = pic;
  }

  async disRecipe() {
    const fullLink = `https://api.spoonacular.com/recipes/${this.id}/ingredientWidget.json?apiKey=${apiKey}`;
    try {
      const res = await axios(fullLink);
      this.data = res.data.ingredients;
    } catch (error) {
      alert("Sorry, something went wrong.");
    }
  }
  // ! check
  calcTime() {
    let ingCount, parts;
    ingCount = this.data.length;
    parts = ingCount / 3;
    this.cookTime = parts * 15;
  }

  calcServings() {
    if (this.data.length > 10) {
      this.servings = 4;
    } else {
      this.servings = 2;
    }
  }
  
  // to change units of ing
  changeUnit = () => {
    const toChange = ["tbsps", "tsps", "servings", "squares"];
    const newUnit = ["tbsp", "tsp", "serv", "sqr"];
    const newArray = this.data.map((el) => {
      let ing = el.amount.metric.unit.toLowerCase();

      toChange.forEach((unit, i) => {
          ing = ing.replace(unit, newUnit[i]);
      });

      // ? to return a new object and retain an old array
      return {
        ...el,
        amount: {
          ...el.amount,
          metric: {
            ...el.amount.metric,
            unit: ing,
          },
        },
      };
    });
    this.data = newArray;
  };
}
