import { Post } from "./types.js";

// отримання DOM-елементів з правильними типами
const form = document.getElementById("postform") as HTMLFormElement;
const postsContainer = document.getElementById("posts") as HTMLDivElement;
const clearBtn = document.getElementById("clearposts") as HTMLButtonElement;
const postCounter = document.getElementById("postcounter") as HTMLParagraphElement;

const titleInput = document.getElementById("title") as HTMLInputElement;
const bodyInput = document.getElementById("body") as HTMLTextAreaElement;

const statusEl = document.getElementById("form-status") as HTMLDivElement | null;

function setStatus(msg: string): void {
  if (statusEl) statusEl.textContent = msg;
}

function setError(
  input: HTMLInputElement | HTMLTextAreaElement,
  errorElementId: string,
  message: string
): void {
  input.setAttribute("aria-invalid", "true");

  const errEl = document.getElementById(errorElementId);
  if (errEl) errEl.textContent = message;
}

function clearError(
  input: HTMLInputElement | HTMLTextAreaElement,
  errorElementId: string
): void {
  input.setAttribute("aria-invalid", "false");

  const errEl = document.getElementById(errorElementId);
  if (errEl) errEl.textContent = "";
}

function validatePostForm(): boolean {
  let ok = true;

  const title = titleInput.value.trim();
  if (title.length < 3) {
    setError(titleInput, "err-title", "Заголовок має містити щонайменше 3 символи.");
    ok = false;
  } else {
    clearError(titleInput, "err-title");
  }

  const body = bodyInput.value.trim();
  if (body.length < 10) {
    setError(bodyInput, "err-body", "Текст має містити щонайменше 10 символів.");
    ok = false;
  } else {
    clearError(bodyInput, "err-body");
  }

  return ok;
}

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
  setStatus("Пости очищено.");
}

titleInput.addEventListener("blur", () => validatePostForm());
bodyInput.addEventListener("blur", () => validatePostForm());

titleInput.addEventListener("input", () => {
  if (titleInput.getAttribute("aria-invalid") === "true") validatePostForm();
});
bodyInput.addEventListener("input", () => {
  if (bodyInput.getAttribute("aria-invalid") === "true") validatePostForm();
});

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const ok = validatePostForm();
  if (!ok) {
    const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
    firstInvalid?.focus();

    setStatus("Форма містить помилки. Перевірте поля.");
    return;
  }

  const post: Post = {
    id: Date.now(),
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    createdAt: new Date(),
  };

  const node = renderPost(post);
  postsContainer.appendChild(node);

  updateCounter();

  titleInput.value = "";
  bodyInput.value = "";

  clearError(titleInput, "err-title");
  clearError(bodyInput, "err-body");

  setStatus("Пост додано.");
});

// Обробник очищення
clearBtn.addEventListener("click", () => {
  clearPosts();
});
