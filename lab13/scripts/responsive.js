import { BREAKPOINTS } from "./breakpoints.js";
const sidebarEl = document.getElementById("sidebar");
const menuButtonEl = document.getElementById("menuButton");
if (!(sidebarEl instanceof HTMLElement) || !(menuButtonEl instanceof HTMLButtonElement)) {
    console.warn("Елементів #sidebar або #menuButton не знайдено в DOM.");
}
else {
    const sidebar = sidebarEl;
    const menuButton = menuButtonEl;
    const mqlMobile = window.matchMedia(BREAKPOINTS.mobile);
    const mqlTablet = window.matchMedia(BREAKPOINTS.tablet);
    const mqlDesktop = window.matchMedia(BREAKPOINTS.desktop);
    function applyResponsiveLayout() {
        if (mqlDesktop.matches || mqlTablet.matches) {
            sidebar.classList.remove("hidden");
            menuButton.classList.add("hidden");
            menuButton.setAttribute("aria-expanded", "false");
        }
        else if (mqlMobile.matches) {
            sidebar.classList.add("hidden");
            menuButton.classList.remove("hidden");
            menuButton.setAttribute("aria-expanded", "false");
        }
    }
    applyResponsiveLayout();
    mqlDesktop.addEventListener("change", applyResponsiveLayout);
    mqlTablet.addEventListener("change", applyResponsiveLayout);
    mqlMobile.addEventListener("change", applyResponsiveLayout);
    menuButton.addEventListener("click", () => {
        if (!mqlMobile.matches) {
            return;
        }
        const isHidden = sidebar.classList.toggle("hidden");
        menuButton.setAttribute("aria-expanded", isHidden ? "false" : "true");
    });
}
//# sourceMappingURL=responsive.js.map