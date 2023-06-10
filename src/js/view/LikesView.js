import { elements } from "./base";

export const toggleLikeBtn = isLiked => {
    if (isLiked) {
        document.querySelector(".favoriteRecipeBtn").classList.add("darkLike");
    } else {
        document
          .querySelector(".favoriteRecipeBtn")
          .classList.remove("darkLike");
    }
};