import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getRecipe() {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch`;
    const apiKey = "c062fd2c1f8546059535d4d223d1334f";
    const fullLink = `${apiUrl}?apiKey=${apiKey}&query=${this.query}`;
    // ?axios
    try {
      const res = await axios(fullLink);
      this.data = res.data.results;
    } catch (error) {
      alert(error);
    }
  }
}
