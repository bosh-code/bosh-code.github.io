// Modified Dark mode switcher
// Source: https://blog.shhdharmen.me/toggle-light-and-dark-themes-in-bootstrap

const LOCAL_STORAGE_KEY = "darkmode";
const LOCAL_META_DATA = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
const DARK_THEME_PATH = "/css/dark.css";
const DARK_STYLE_LINK = document.getElementById("dark-theme-style");
let isDark = LOCAL_META_DATA && LOCAL_META_DATA.isDark;

// check if user has already selected dark theme earlier
if (isDark) {
	enableDarkTheme();
} else {
	disableDarkTheme();
}

/**
 * Apart from toggling themes, this will also store user's theme preference in local storage.
 * So when user visits next time, we can load the same theme.
 *
 */
function toggleTheme() {
	isDark = !isDark;
	if (isDark) {
		enableDarkTheme();
	} else {
		disableDarkTheme();
	}
	const META = {isDark};
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(META));
}

function enableDarkTheme() {
	DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
}

function disableDarkTheme() {
	DARK_STYLE_LINK.setAttribute("href", "");
}
