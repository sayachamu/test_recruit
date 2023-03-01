// SPサイズ調整

const setWindowWidthSP = () => {
  const width = window.innerWidth;
  if (width > 750) return;
  document.documentElement.style.setProperty("--window-width-sp", width);
};

setWindowWidthSP();
window.addEventListener("resize", setWindowWidthSP);

/***
 * ヘッダー
 */

let isNavigationActive = false;
const hamburgerButtonEl = document.querySelector("#nav-btn");
const navigationEl = document.querySelector("#navigation");
const headerLogoSPEl = document.querySelector(".header__logo--sp");

hamburgerButtonEl.addEventListener(
  "click",
  () => {
    isNavigationActive = !isNavigationActive;
    hamburgerButtonEl.dataset.active = isNavigationActive;
    navigationEl.dataset.active = isNavigationActive;
    headerLogoSPEl.dataset.hidden = isNavigationActive;
    document.documentElement.style.setProperty(
      "overflow",
      isNavigationActive ? "hidden" : "initial"
    );
  },
  false
);
