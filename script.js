const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "27288807-7c18b43e45aba5d7e6b6f5102";

async function getPhotos() {
  /* docs: https://pixabay.com/api/docs/#api_javascript_example */
  return fetch(`${BASE_URL}?key=${API_KEY}&q=yellow+flowers&image_type=photo`, {
    method: "GET",
  }).then((response) => response.json());
}

window.addEventListener("load", async function () {
  const res = await getPhotos();
  const imageContainer = this.document.getElementById("image-container");

  res.hits.forEach((image) => {
    const imgWrapper = this.document.createElement("div");
    imgWrapper.classList.add("image-wrapper");

    const img = this.document.createElement("img");
    img.src = image.largeImageURL;
    img.alt = image.tags;
    imgWrapper.appendChild(img);

    const imageInfo = this.document.createElement("div");
    imageInfo.classList.add("image-info");

    const likeInfo = this.document.createElement("div");
    likeInfo.classList.add("like-info");

    const likeIconWrapper = this.document.createElement("div");
    likeIconWrapper.classList.add("like-icon-wrapper");

    const likeIcon = this.document.createElement("img");
    likeIcon.src = "./assets/png/like.png";
    likeIconWrapper.appendChild(likeIcon);

    likeInfo.appendChild(likeIconWrapper);

    const likeCount = this.document.createElement("span");
    likeCount.innerText = image.likes;

    likeInfo.appendChild(likeCount);

    const commentInfo = this.document.createElement("div");
    commentInfo.classList.add("comment-info");

    const commentIconWrapper = this.document.createElement("div");
    commentIconWrapper.classList.add("comment-icon-wrapper");

    const commentIcon = this.document.createElement("img");
    commentIcon.src = "./assets/png/comment.png";
    commentIconWrapper.appendChild(commentIcon);

    commentInfo.appendChild(commentIconWrapper);

    const commentCount = this.document.createElement("span");
    commentCount.innerText = image.comments;

    commentInfo.appendChild(commentCount);

    imageInfo.appendChild(likeInfo);
    imageInfo.appendChild(commentInfo);

    imgWrapper.appendChild(imageInfo);

    imageContainer.appendChild(imgWrapper);
  });

  const imagesWrapper = Array.from(
    document.getElementsByClassName("image-wrapper"),
  );

  imagesWrapper.forEach((imageWrapper, i) => {
    imageWrapper.addEventListener("mouseenter", function () {
      Array.from(this.children)
        .find((child) => child.classList.contains("image-info"))
        .classList.add("visible");
    });

    imageWrapper.addEventListener("mouseleave", function () {
      Array.from(this.children)
        .find((child) => child.classList.contains("image-info"))
        .classList.remove("visible");
    });
  });
});
