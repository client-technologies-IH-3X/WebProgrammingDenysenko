import { fetchArticles } from "./articlesApi.js";
const container = document.querySelector("#api-posts");
const statusElement = document.querySelector("#api-status");
const reloadBtn = document.querySelector("#reload-posts");
let state = { status: "idle" };
function renderState() {
    if (!container || !statusElement)
        return;
    statusElement.textContent = "";
    container.innerHTML = "";
    switch (state.status) {
        case "idle":
            statusElement.textContent = "Натисніть «Оновити пости», щоб завантажити статті.";
            break;
        case "loading":
            statusElement.textContent = "Завантаження статей…";
            break;
        case "error":
            statusElement.textContent = state.message;
            break;
        case "success":
            statusElement.textContent = `Показано ${state.data.length} статей:`;
            state.data.forEach((article) => {
                const block = document.createElement("article");
                block.className = "post";
                const title = document.createElement("h3");
                title.textContent = article.title;
                const desc = document.createElement("p");
                desc.textContent = article.description?.slice(0, 130) + "…";
                const link = document.createElement("a");
                link.href = article.url;
                link.target = "_blank";
                link.textContent = "Читати статтю →";
                const date = document.createElement("small");
                date.textContent = `Опубліковано: ${article.readable_publish_date}`;
                block.appendChild(title);
                block.appendChild(desc);
                block.appendChild(date);
                block.appendChild(link);
                container.appendChild(block);
            });
            break;
    }
}
async function loadArticles() {
    state = { status: "loading" };
    renderState();
    try {
        const articles = await fetchArticles(5);
        state = { status: "success", data: articles };
    }
    catch {
        state = {
            status: "error",
            message: "Не вдалося завантажити статті. Спробуйте пізніше.",
        };
    }
    renderState();
}
reloadBtn?.addEventListener("click", () => {
    void loadArticles();
});
//# sourceMappingURL=lastArticles.js.map