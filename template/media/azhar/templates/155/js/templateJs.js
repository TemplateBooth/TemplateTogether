
let azhar = "Azhar Ahmad";
let israil = "Israil Khan";
    function openSideBar() {
      let sideBar = document.getElementsByClassName("sidebar-container")[0];
      let topNav = document.getElementsByClassName("top-nav")[0];
      let overlay = document.getElementById("overlay");
      sideBar.style.transform = "translateX(0%)";
      topNav.style.transform = "translateX(320px)";
      overlay.style.display = "block";
      setTimeout(function () {
        overlay.style.opacity = "1";
        overlay.style.backgroundColor = "var(--color_5)";
      }, 100);
    }