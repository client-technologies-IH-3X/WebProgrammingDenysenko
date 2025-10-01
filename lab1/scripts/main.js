// TODO: персоналізація: налаштуйте власні дані

const studentName = "Денисенко Денис";
const group = "ІН-31";
const emoji = "🍕"; // замініть на свій унікальний емодзі

// Проста генерація унікального ID сторінки (час + випадкова частина)
function generatePageId() {
  const ts = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LAB1-${ts}-${rnd}`;
}

function setBadge(id) {
  const el = document.getElementById("pageIdBadge");
  if (el) {
    el.textContent = `PageID: ${id}`;
    el.setAttribute("data-owner", studentName);
  }

}

function setAccentPreview() {
  const preview = document.querySelector(".accent-preview");
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  if (preview) {
    preview.textContent = accent || "—";
  }

}

function helloConsole(id) {
  // Персональне вітання в консолі (перевіряється у DevTools)
  console.log(`${emoji} Вітаю! Це моя ЛР1. Студент(ка): ${studentName}, група: ${group}. Унікальний ID: ${id}`);

}

document.addEventListener("DOMContentLoaded", () => {
  const id = generatePageId();
  setBadge(id);
  setAccentPreview();

  // Записати ідентифікатор у localStorage як доказ «унікальності» сторінки для цього студента
  try {
    localStorage.setItem("lab1.pageId", id);
  } catch (_) {
    // ignore
  }

  helloConsole(id);
});