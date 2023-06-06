import axios from "axios";
import { apiSearchUrl, apiKey } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getRecipe() {
    const fullLink = `${apiSearchUrl}?apiKey=${apiKey}&query=${this.query}&number=20`;
    // ?axios
    try {
      const res = await axios(fullLink);
      this.data = res.data.results;
    } catch (error) {
      alert(error);
    }
  }
}
