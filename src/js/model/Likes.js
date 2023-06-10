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

    this.persisntData();
    
    return like;
  }

  deleteItem(id) {
    const index = this.likes.findIndex((el) => el.id == id);
    this.likes.splice(index, 1);
    this.persisntData();
  }

  hasLike(id) {
    console.log(this.likes.findIndex((el) => el.id == id) != -1)
    return this.likes.findIndex((el) => el.id == id) != -1;
  }

  getLikesNumber() {
    return this.likes.length;
  }

  persisntData() {
    localStorage.setItem('likes', JSON.stringify(this.likes))
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('recipe'))
    if (storage){
        this.likes = storage
    }
  }
}
