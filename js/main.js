// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// If There's Color Item In Local Storage
if (mainColors !== null) {
  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

let toupSpan;
// make a to up btn;
function toup() {
  // create a span
  toupSpan = document.createElement("span");

  // add class to toupSpan
  toupSpan.className = "to-up";

  // create a text to toupSpan
  let toupText = document.createTextNode("Up");

  // append text to the span
  toupSpan.appendChild(toupText);

  // append span to the body
  document.body.appendChild(toupSpan);

  // scroll to top on clicking
  toupSpan.onclick = function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
}
toup();

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not EMpty
if (backgroundLocalItem !== null) {
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// toogle spin class opened
// get the toogle
let settingsToggle = document.querySelector(".toggle-settings");

// get the settings-box
let settingsBox = document.querySelector(".settings-box");

// onclick function
settingsToggle.onclick = function () {
  // stop rotation of the icon while click on it
  document
    .querySelector(".toggle-settings .fa-gear")
    .classList.toggle("fa-spin");

  // add and remove classes from setting-box
  if (settingsBox.classList.contains("opened")) {
    settingsBox.classList.remove("opened");
  } else {
    settingsBox.classList.add("opened");
  }
};

// colors option
// get the ul element
let changerElement = document.querySelectorAll(".colors-list li");

// loop on it
changerElement.forEach((li) => {
  // loop on items
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.currentTarget.dataset.color
    );

    // set color in local storage
    localStorage.setItem("color_option", e.currentTarget.dataset.color);

    // add active class
    handleActive(e);

    // set active class in local storage
    localStorage.setItem("active", e.currentTarget.dataset.color);
  });
});

// random bacground option
// get the ul element
let backElement = document.querySelectorAll(".random-backgrounds span");

// loop on it
backElement.forEach((span) => {
  // loop on items
  span.addEventListener("click", (e) => {
    handleActive(e);

    // check if the dataset is yes or no
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomize();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// randomize the background
// select the page
let landing = document.querySelector(".landing-page");

// make an array of img
let imgsArray = [
  "landing_1.webp",
  "landing_2.webp",
  "landing_3.jpg",
  "landing_4.webp",
  "landing_5.webp",
];

// function to randomize the background

function randomize() {
  // check if the backgroundOption is true or false
  if (backgroundOption === true) {
    backInterval = setInterval(() => {
      // create random img
      let randomImg = Math.floor(Math.random() * imgsArray.length);

      // set the background img
      landing.style.backgroundImage = `url(imgs/${imgsArray[randomImg]})`;
    }, 3000);
  }
}
randomize();

// get skills
let skills = document.querySelector(".skills");

// set pourcentage on scroll
window.onscroll = function () {
  // check the height of scroll
  if (window.scrollY >= skills.scrollHeight + 400) {
    // get the span
    document.querySelectorAll(".skill-progress span").forEach((span) => {
      // set the function
      count(span);
    });

    // show the btn
    toupSpan.style.display = "block";
  } else {
    toupSpan.style.display = "none";
  }
};

// function to reach the goal
function count(el) {
  // get the width for each span
  let goal = el.dataset.width;

  // set an interval to start counting
  let count = setInterval(() => {
    el.style.width = `${goal}`;

    if (el.style.width == goal) {
      // clear interval when we reach the goal
      clearInterval(count);
    }
  }, 2000 / goal);
}

// create our popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // append overlay to body
    document.body.appendChild(overlay);

    // create the popup Box
    let popupBox = document.createElement("div");

    // add class to the poppup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // create the image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // append popup-img to popupbox
    popupBox.appendChild(popupImage);

    // append popup-box to body
    document.body.appendChild(popupBox);

    // create the close span
    let closeSpan = document.createElement("span");

    // create the close span text
    closeSpanText = document.createTextNode("X");

    // append text to the span
    closeSpan.appendChild(closeSpanText);

    // add class to the close button
    closeSpan.className = "close-span";

    // add closespan to the popup box
    popupBox.appendChild(closeSpan);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-span") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// handle active State
function handleActive(ev) {
  // remove the active class
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add the active class
  ev.target.classList.add("active");
}

// show bullets option
// get the bulletsOption
let bulletsOption = document.querySelectorAll(".show-bullets span");
// get the bullets
let myBullets = document.querySelector(".nav-bullets");
// get from the local storage
let bulletLocalItem = localStorage.getItem("bullets_option");

// check if the local have a value
if (bulletLocalItem !== null) {
  // remove class from active
  bulletsOption.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    myBullets.style.display = "block";

    document.querySelector(".show-bullets .yes").classList.add("active");
  } else {
    myBullets.style.display = "none";

    document.querySelector(".show-bullets .no").classList.add("active");
  }
}

// loop on the spans
bulletsOption.forEach((span) => {
  // ev on span
  span.addEventListener("click", (e) => {
    // handle function
    handleActive(e);

    // check the content of the bullet
    if (span.dataset.display == "show") {
      // loop on the bullets and display block
      myBullets.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      // loop on the bullets and display none
      myBullets.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }
  });
});

// reset button
document.querySelector(".reset-options").onclick = function () {
  // use clear when u dont want to save any data in your website
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");

  // reload window
  window.location.reload();
};

// menu click
let toggleBtn = document.querySelector(".toggle-menu");
let menuUl = document.querySelector(".links-container ul");

toggleBtn.onclick = function (e) {
  // stop propagation
  e.stopPropagation();

  // toggle calss menu-active
  this.classList.toggle("menu-active");

  // toggle calss open
  menuUl.classList.toggle("open");
};

// click anywhere outside meny and toggle btn
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== menuUl) {
    // check if menu is open
    if (menuUl.classList.contains("open")) {
      // // toggle calss menu-active
      // this.classList.toggle("menu-active")

      // toggle calss open
      menuUl.classList.toggle("open");
    }
  }
});

// stop propagation on menu
menuUl.onclick = function (e) {
  e.stopPropagation();
};
