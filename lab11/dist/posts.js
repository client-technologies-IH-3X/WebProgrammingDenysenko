// отримання DOM-елементів з правильними типами
const postsContainer = document.getElementById("posts");
const addPostBtn = document.getElementById("addPost");
const clearBtn = document.getElementById("clearPosts");
const postCounter = document.getElementById("postCounter");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
// Функція створення DOM-вузла поста
export function renderPost(post) {
    const wrapper = document.createElement("div");
    wrapper.className = "post";
    const h3 = document.createElement("h3");
    h3.textContent = post.title;
    const p = document.createElement("p");
    p.textContent = post.body;
    const small = document.createElement("small");
    small.textContent = post.createdAt.toLocaleString("uk-UA");
    wrapper.append(h3, p, small);
    return wrapper;
}
// Оновлення лічильника
export function updateCounter() {
    const count = postsContainer.children.length;
    postCounter.textContent = `Усього постів: ${count}`;
}
// Очищення списку постів
export function clearPosts() {
    postsContainer.innerHTML = "";
    updateCounter();
}
// Обробник додавання поста
addPostBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const post = {
        id: Date.now(),
        title: titleInput.value,
        body: bodyInput.value,
        createdAt: new Date(),
    };
    const node = renderPost(post);
    postsContainer.appendChild(node);
    updateCounter();
    titleInput.value = "";
    bodyInput.value = "";
});
// Обробник очищення
clearBtn.addEventListener("click", () => {
    clearPosts();
});
//# sourceMappingURL=posts.js.map