type Theme = "light" | "dark";

const root = document.documentElement;
const button = document.getElementById("theme-toggle") as HTMLButtonElement;

function getStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme): void {
  root.dataset.theme = theme;
  button.textContent = theme === "dark" ? "☀️" : "🌙";
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable; ignore */
  }
}

const preferred: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(getStoredTheme() ?? preferred);

button.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});
