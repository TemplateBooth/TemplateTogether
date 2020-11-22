function openSearch() {
  let linksContainer = document.querySelector(".top-nav .nav-links");
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
  let linksContainer = document.querySelector(".top-nav .nav-links");

  let searchContent = document.getElementsByClassName("search-content")[0];
  searchContent.style.opacity = "0";

  searchContent.style.display = "none";
  linksContainer.style.display = "flex";
  setTimeout(function () {
    linksContainer.style.opacity = "1";
  }, 500);
}
