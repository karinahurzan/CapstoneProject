"use strict";

const burgerBtn = document.querySelector(".burger-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.querySelector(".modal-burger-button");
const href = document.querySelectorAll(".menu-list-item");
const coursesBtn = document.querySelector(".courses-button");
const subMenu = document.querySelector(".modal-submenu");

burgerBtn.addEventListener("click", () => {
  modalOverlay.classList.add("is-open");
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("is-open");
  subMenu.style.display = "none";
});

[...href].forEach((el) =>
  el.addEventListener("click", () => {
    modalOverlay.classList.remove("is-open");
    subMenu.style.display = "none";
  })
);

coursesBtn.addEventListener("click", () => {
  if (subMenu.style.display === "flex") {
    subMenu.style.display = "none";
  } else {
    subMenu.style.display = "flex";
  }
});
