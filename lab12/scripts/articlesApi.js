const API_URL = "https://dev.to/api/articles?per_page=";
export async function fetchArticles(limit) {
    try {
        const response = await fetch(API_URL + limit);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Не вдалося завантажити статті:", error);
        throw error;
    }
}
//# sourceMappingURL=articlesApi.js.map