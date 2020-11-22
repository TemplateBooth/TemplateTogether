function openSideBar() {
  let sideBar = document.getElementsByClassName("sidebar-container")[0];
  let topNav = document.getElementsByClassName("top-nav")[0];
  let overlay = document.getElementById("overlay");
  sideBar.style.transform = "translateX(0%)";
  topNav.style.transform = "translateX(320px)";
  overlay.style.display = "block";
  setTimeout(function () {
    overlay.style.opacity = "1";
  }, 100);
}

function closeSideBar() {
  let sideBar = document.getElementsByClassName("sidebar-container")[0];
  let topNav = document.getElementsByClassName("top-nav")[0];
  let overlay = document.getElementById("overlay");
  sideBar.style.transform = "translateX(-100%)";
  topNav.style.transform = "translateX(0px)";
  overlay.style.opacity = "0";
  setTimeout(function () {
    overlay.style.display = "none";
  }, 300);
}

function openSearch() {
  let linksContainer = document.getElementById("links-container");
  linksContainer.style.opacity = "0";
  setTimeout(function () {
    linksContainer.style.display = "none";
  }, 400);
  let searchContent = document.getElementsByClassName("search-content")[0];
  searchContent.style.display = "flex";
  setTimeout(function () {
    searchContent.style.opacity = "1";
  }, 500);
}
function closeSearch() {
  let linksContainer = document.getElementById("links-container");

  let searchContent = document.getElementsByClassName("search-content")[0];
  searchContent.style.opacity = "0";

  searchContent.style.display = "none";
  linksContainer.style.display = "flex";
  setTimeout(function () {
    linksContainer.style.opacity = "1";
  }, 500);
}
/*
function openSearch(elem) {
  elem.style.opacity = "0";
  elem.style.zIndex = "0";
  elem.style.display = "none";
  let logoLink = document.getElementsByClassName("logo-link")[0];
  let rightLink = document.getElementsByClassName("right-link")[0];
  logoLink.style.opacity = "0";
  logoLink.style.zIndex = "0";
  rightLink.style.opacity = "0";
  rightLink.style.zIndex = "0";

  let searchContent = document.getElementsByClassName("search-content")[0];
  setTimeout(function () {
    searchContent.style.zIndex = "1";
    searchContent.style.opacity = "1";
  }, 300);
}
*/
/*
function closeSearch() {
  let searchContent = document.getElementsByClassName("search-content")[0];
  searchContent.style.zIndex = "0";
  searchContent.style.opacity = "0";

  setTimeout(function () {
    let searchLink = document.getElementsByClassName("search-link")[0];
    let logoLink = document.getElementsByClassName("logo-link")[0];
    let rightLink = document.getElementsByClassName("right-link")[0];
    searchLink.style.opacity = "1";
    searchLink.style.zIndex = "1";
    searchLink.style.display = "flex";
    logoLink.style.opacity = "1";
    logoLink.style.zIndex = "1";
    rightLink.style.opacity = "1";
    rightLink.style.zIndex = "1";
  }, 300);
}
*/
