function openNav() {
  let toggler = document.getElementsByClassName("toggler")[0];
  toggler.classList.toggle("rotate-toggler");
  let navItems = document.querySelectorAll(".nav-item");

  let overlayNav = document.getElementsByClassName("overlay-nav")[0];
  console.log("1");
  if (overlayNav.style.display != "block") {
    let animDuration = 0.4;
    navItems.forEach((item) => {
      item.style.animation = ``;
      item.style.transform = "translateY(0%)";
      item.style.opacity = "1";
    });
    navItems.forEach((item, index) => {
      console.log(item, index);
      if (item.style.animation) {
        item.style.animation = ``;
      } else {
        item.style.animation = `slideToTop ${animDuration}s ease forwards ${
          index / 4
        }s`;
        animDuration = animDuration - 0.1;
      }
    });
    console.log("2");
    overlayNav.style.display = "block";
    setTimeout(function () {
      console.log("3");
      overlayNav.style.opacity = "1";
    }, 1000);
  } else {
    overlayNav.style.opacity = "0";
    setTimeout(function () {
      overlayNav.style.display = "none";
      navItems.forEach((item) => {
        item.style.animation = ``;
        item.style.transform = "translateY(-30%)";
        item.style.opacity = "0";
      });
    }, 500);
    setTimeout(function () {
      let animDuration = 0.4;
      navItems.forEach((item, index) => {
        console.log(item, index);
        if (item.style.animation) {
          item.style.animation = ``;
        } else {
          item.style.animation = `slideToBottom ${animDuration}s ease forwards ${
            index / 3
          }s`;
          animDuration = animDuration - 0.1;
        }
      });
    }, 600);
  }
}
