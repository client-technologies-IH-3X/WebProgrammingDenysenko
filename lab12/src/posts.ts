import { Post } from "./types.js";

// отримання DOM-елементів з правильними типами
const postsContainer = document.getElementById("posts") as HTMLDivElement;
const addPostBtn = document.getElementById("addpost") as HTMLButtonElement;
const clearBtn = document.getElementById("clearposts") as HTMLButtonElement;
const postCounter = document.getElementById("postcounter") as HTMLParagraphElement;

const titleInput = document.getElementById("title") as HTMLInputElement;
const bodyInput = document.getElementById("body") as HTMLTextAreaElement;

// Функція створення DOM-вузла поста
export function renderPost(post: Post): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "post";

  const h3 = document.createElement("h3");
  h3.textContent = post.title;

  const p = document.createElement("p");
  p.textContent = post.body;

  const small = document.createElement("small");
  small.textContent = post.createdAt.toLocaleString();

  wrapper.append(h3, p, small);
  return wrapper;
}

// Оновлення лічильника
export function updateCounter(): void {
  const count = postsContainer.children.length;
  postCounter.textContent = `Усього постів: ${count}`;
}

// Очищення списку постів
export function clearPosts(): void {
  postsContainer.innerHTML = "";
  updateCounter();
}

// Обробник додавання поста
addPostBtn.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();

  const post: Post = {
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
