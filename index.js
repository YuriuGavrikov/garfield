let heart = document.querySelector(".strip__likes__heart");

heart.onclick = () => {
  heart.classList.toggle("strip__likes__heart-liked");
};

let calendar = document.querySelector(".user-menu__calendar__btn");

calendar.onclick = () => {
  document.querySelector(".datepickr-calendar").classList.toggle("open");
};
