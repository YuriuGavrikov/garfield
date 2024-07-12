let heart = document.querySelector(".strip__likes__heart");

heart.onclick = () => {
  heart.classList.toggle("strip__likes__heart-liked");
};

let calendar = document.querySelector(".user-menu__calendar__btn");

calendar.onclick = () => {
  document.querySelector(".datepickr-calendar").classList.toggle("open");
};

let popUp = document.querySelector(".translation__proposal__title");

popUp.onclick = () => {
  document
    .querySelector(".translation__proposal__popup")
    .classList.toggle("open");
};

let checkboxLanguage = document.querySelector(".checkbox__language");

checkboxLanguage.addEventListener("change", function () {
  console.log("qqq");
  document
    .querySelector(".strip__main__img")
    .classList.toggle("strip__main__img__rus");
  document
    .querySelector(".strip__main__img")
    .classList.toggle("strip__main__img__eng");
});
