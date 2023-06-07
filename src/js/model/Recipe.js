import axios from "axios";
import { apiKey } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  // fetch ingridients
  async disRecipe() {
    const fullLink = `https://api.spoonacular.com/recipes/${this.id}/ingredientWidget.json?apiKey=${apiKey}`;
    try {
      const res = await axios(fullLink);
      this.data = res.data.ingredients;
    } catch (error) {
      alert("Sorry, something went wrong.");
    }
  };
  // calculate time to cook
  calcTime() {
    let ingCount, parts;
    ingCount = this.data.length;
    parts = ingCount / 3;
    this.cookTime = parts * 15;
  }

  // servings
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

  // change value numbers 
  changeValue = () => {
    this.data.forEach((el) => {
      let num = el.amount.metric.value;
      el.amount.metric.value = parseFloat(num.toFixed(1));
    });
  };
  // get image and name
    async getImgName() {
      const fullLink = `https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}`;
      try {
        const res = await axios(fullLink);
        this.image = res.data.image;
        this.title = res.data.title;
      } catch (error) {
        alert("Sorry, something went wrong 404.");
      }
    };



    ingridienceChange(type) {
      let newIng = type == 'inc' ? this.servings + 1 : this.servings - 1;
      this.data.forEach(e => {
        e.amount.metric.value *= newIng/this.servings
      })
      this.servings = newIng;
    };
};