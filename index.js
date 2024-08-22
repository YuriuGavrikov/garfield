let heart = document.querySelector(".strip__likes__heart");

heart.onclick = () => {
  heart.classList.toggle("strip__likes__heart-liked");
};
//--------------------------------------------------------------------------------------
let calendar = document.querySelector(".user-menu__calendar__btn");

calendar.onclick = () => {
  document.querySelector(".datepickr-calendar").classList.toggle("open");
};
//--------------------------------------------------------------------------------------
let popUp = document.querySelector(".translation__proposal__title");

popUp.onclick = () => {
  document
    .querySelector(".translation__proposal__popup")
    .classList.toggle("open");
};
//--------------------------------------------------------------------------------------
let stripMainImg = document.querySelector(".strip__main__img");

const getImgRus = async () => {
  await fetch("https://garfield-archive.ru/api.php?id=20181024")
    .then((response) => response.json())
    .then((json) => {
      stripMainImg.style.backgroundImage = `url(${json.strip.rus_pic_url})`;
    });
};
const getImgEng = async () => {
  await fetch("https://garfield-archive.ru/api.php?id=20181024")
    .then((response) => response.json())
    .then((json) => {
      stripMainImg.style.backgroundImage = `url(${json.strip.eng_pic_url})`;
    });
};
getImgRus();

let checkboxLanguage = document.querySelector(".checkbox__language");

checkboxLanguage.addEventListener("change", function () {
  const arrClasses = [];
  stripMainImg.classList.forEach((item) => arrClasses.push(item));

  console.log(arrClasses);
  console.log(arrClasses.includes("strip__main__img__rus"));

  if (arrClasses.includes("strip__main__img__rus")) {
    getImgEng();
  }
  if (arrClasses.includes("strip__main__img__eng")) {
    getImgRus();
  }

  stripMainImg.classList.toggle("strip__main__img__rus");
  stripMainImg.classList.toggle("strip__main__img__eng");
});
