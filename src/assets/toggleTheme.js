/**
 * Dark mode is better for eyes than that awful thing that blinds nightcrawlers.
 * Don't use light mode!
 *
 *        o
 *   >o< /
 *  / |
 *    |
 */

////////////////////////////////////////////////////////////////////////
/**
 * Functions
 */

/**
 * Utility function to calculate the current theme setting.
 * First: look for a local storage value.
 * That fails (a first-time use-case): fall back to system setting.
 * All fails (default): fall back to light mode.
 * @param {string} localStorageTheme The theme value; should be either `dark` or `light`, if set.
 * @param {MediaQueryList} systemSettingDark The system setting preference the user has designated, if supported.
 */
function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

/**
 * Utility function to update the button text and aria-label.
 * Don't use `toggle()` because on window load it will change
 * the image and break the rendering process. Instead, update
 * the `classList` of `'dark'` with `remove()` and `add()`.
 * This is determined by the truthy value of `isDark`.
 * @param {HTMLButtonElement} buttonEl The button element to query the `classList`.
 * @param {string} isDark Whether the color-scheme or `root`/`html` element data-theme is dark.
 * @param {HTMLImageElement} buttonImage The image/icon to update with your graphic. SVGs are great for small icons
 */
function updateButton({ buttonEl, isDark, buttonImage }) {
  if (isDark) {
    buttonEl.classList.remove("dark");
    buttonImage.setAttribute("src", "../assets/images/day-sun.svg");
  } else {
    buttonEl.classList.add("dark");
    buttonImage.setAttribute("src", "../assets/images/night-moon.svg");
  }
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";

  /**
   * Use an aria-label if you are omitting text on the button
   * and using a sun/moon icon, for example
   */
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.title = newCta;
}

/**
 * Utility function to update the theme setting on the `<html>` tag
 * @param {string} theme The theme name: 'dark' or 'light'.
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

////////////////////////////////////////////////////////////////
/**
 * The crazyness
 */

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const button = document.querySelector("[data-theme-toggle]");
const buttonImg = document.querySelector("img.theme-img");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

/**
 * 3. Update the theme setting and button text accoridng to current settings
 */
updateButton({
  buttonEl: button,
  isDark: currentThemeSetting === "dark",
  buttonImage: buttonImg,
});
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
 * 4. Add an event listener to toggle the theme
 */
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({
    buttonEl: button,
    isDark: newTheme === "dark",
    buttonImage: buttonImg,
  });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});
