export default class Like {
  constructor() {
    this.likes = [];
  }
  addLike(name, image, id) {
    const like = {
      name,
      image,
      id,
    };
    this.likes.push(like);
    return like;
  }

  deleteItem(id) {
    const index = this.likes.findIndex((el) => el.id == id);
    this.likes.splice(index, 1);
  }

  hasLike(id) {
    console.log(this.likes.findIndex((el) => el.id == id) != -1)
    return this.likes.findIndex((el) => el.id == id) != -1;
  }

  getLikesNumber() {
    return this.likes.length;
  }
}
