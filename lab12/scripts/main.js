const articles = [
  {
    id: 1,
    title: "JavaScript",
    hours: "100",
    date: "2025-10-10",
    category: "Програмування",
    lvl: ["Intermediate"],
    content: "Я пройшов курси з JavaScript та курс навчання у СумДУ.",
  },
  {
    id: 2,
    title: "HTML5",
    hours: "50",
    date: "2025-10-11",
    category: "Програмування",
    lvl: ["Advanced"],
    content: "Я пройшов курси з HTML5 та курс навчання у СумДУ.",
  },
  {
    id: 3,
    title: "CSS3",
    hours: "30",
    date: "2025-10-12",
    category: "Програмування",
    lvl: ["Intermediate"],
    content: "Я пройшов курси з CSS3 та курс навчання у СумДУ.",
  },
  {
    id: 4,
    title: "C++",
    hours: "150",
    date: "2025-12-13",
    category: "Програмування",
    lvl: ["Advanced"],
    content: "Я пройшов та курс програмування по C++ у СумДУ.",
  },
  {
    id: 4,
    title: "Англійська рівня B1",
    hours: "500",
    date: "2025-10-14",
    category: "Мова",
    lvl: ["Intermediate"],
    content: "Я майже вільно володію англійською як звичайну так і технічну з будь яким акцентом, але прицьому вільно розмовляти я ще не можу.",
  },
];

const postsContainer = document.querySelector("#skills");
const counterEl = document.querySelector("#counter");
const toolbar = document.querySelector("#toolbar");
const btnAll = document.querySelector("#btnAll");
const searchInput = document.querySelector("#searchTitle");
const searchBtn = document.querySelector("#searchBtn");

const renderArticle = ({ title, hours, date, category, lvl = [], content }) => `
  <article class="skill" data-category="${category}">
    <h2>${title}</h2>
    <p class="meta">
      Час вивчення: <b>${hours}</b> | Категорія: <i>${category}</i> |
      ${new Date(date).toLocaleDateString("uk-UA")}
    </p>
    <p>${content}</p>
    <div class="lvl">
      ${lvl.map(t => `<span class="tag">${t}</span>`).join("")}
    </div>
  </article>
`;

const renderAll = (list = articles) => {
  postsContainer.innerHTML = list.map(renderArticle).join("");
  counterEl.textContent = `Кількість: ${list.length}`;
};

const getCategories = () =>
  Array.from(new Set(articles.map(a => a.category))).sort();


const renderCategoryButtons = () => {
  toolbar.querySelectorAll("[data-filter]").forEach(b => b.remove());
  const cats = getCategories();
  const afterAllBtn = btnAll.nextElementSibling ? btnAll : btnAll;
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = cat;
    btn.dataset.filter = cat;
    btn.setAttribute("aria-pressed", "false");
    btnAll.insertAdjacentElement("afterend", btn);
  });
};

const filterByCategory = (category) =>
  articles.filter(a => a.category.toLowerCase() === category.toLowerCase());

const findByTitle = (query) =>
  articles.find(a => a.title.toLowerCase().includes(query.toLowerCase()));


toolbar.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  toolbar.querySelectorAll(".btn[aria-pressed]").forEach(b => b.setAttribute("aria-pressed", "false"));
  if (btn.id === "btnAll") {
    btn.setAttribute("aria-pressed", "true");
    renderAll(articles);
    return;
  }
  if (btn.dataset.filter) {
    btn.setAttribute("aria-pressed", "true");
    const list = filterByCategory(btn.dataset.filter);
    renderAll(list);
  }
});

const doFind = () => {
  const q = (searchInput.value || "").trim();
  if (!q) return;
  const found = findByTitle(q);
  if (found) {
    renderAll(articles);
    const node = [...postsContainer.children].find(
      el => el.querySelector("h2").textContent === found.title
    );
    if (node) {
      node.style.outline = "3px solid #2563eb";
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => (node.style.outline = ""), 1600);
    }
    console.log("Знайдено:", found);
  } else {
    console.log("Нічого не знайдено за запитом:", q);
  }
};
searchBtn.addEventListener("click", doFind);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doFind();
});

renderCategoryButtons();
renderAll(articles);

const chatList = document.querySelector("#chat-list");
const chatStatus = document.querySelector("#chat-status");

async function loadChatData() {
  try {
    chatStatus.textContent = "Завантаження";
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error(`Статус відповіді: ${response.status}`);
    }

    const users = await response.json();

    chatList.innerHTML = users
      .map(
        (user) => `
        <li class="chat-user">
          <strong>${user.name}</strong> (${user.email})
          <ul class="messages">
            ${user.messages.map((msg) => `<li>${msg}</li>`).join("")}
          </ul>
        </li>
      `
      )
      .join("");

    chatStatus.textContent = "Дані успішно завантажено";
  } catch (error) {
    console.error("Помилка: ", error);
    chatStatus.textContent = "Помилка завантаження даних";
  }
}

loadChatData();
