import { getJson, getTransCache, getOrdinalNumberDay } from "./get.js";

let transCache = {};

//---------------------------------------------------------------------------------------
const getLastDateString = () => {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day - 1}`;
};

//---------------------------------------------------------------------------------------
let currentDate = "20181024";

let stripImgRus = "url(img/not-3.png)";
let stripImgEng = "url(img/not-3.png)";

let stripMain = document.querySelector(".strip__main");
let stripMainImg = document.querySelector(".strip__main__img");

let stripDateInner = document.querySelector(".strip__date__inner");

let likes = document.querySelector(".strip__likes__heart");

let blog = document.querySelector(".blog");
let blogMessage = document.querySelector(".blog__message");
let blogDate = document.querySelector(".blog__date_js");

let translationTitle = document.querySelector(".translation__title");
let translationDesc = document.querySelector(".translation__desc");

let translationItemRus = document.querySelector(".translation__item_rus");
let translationItemEng = document.querySelector(".translation__item_eng");
let translationItemDescRus = document.querySelector(
  ".translation__item__desc_rus"
);
let translationItemDescEng = document.querySelector(
  ".translation__item__desc_eng"
);
//---------------------------------------------------------------------------------------

let calendarBtn = document.querySelector(".user-menu__calendar__btn");

let calendarWrapper = document.querySelector(".calendar__wrapper");

document.addEventListener("DOMContentLoaded", () => {
  const options = {
    date: {
      min: "1978-06-19",
      max: getLastDateString(),
    },
    settings: {
      lang: "ru",
      visibility: {
        daysOutside: false,
      },
    },
    actions: {
      clickDay(event, self) {
        currentDate = self.selectedDates[0].split("-").join("");
        calendar.hide();
        calendarWrapper.style.display = "none";
        changeView(getJson(currentDate));
        stripDateInner.innerHTML = `${currentDate.slice(
          6,
          8
        )}/${currentDate.slice(4, 6)}/${currentDate.slice(0, 4)}`;
        console.log(currentDate);
        console.log(event);
      },
      getDays(day, date, HTMLElement, HTMLButtonElement, self) {
        switch (transCache[date.slice(0, 4)][getOrdinalNumberDay(date) - 1]) {
          case "0":
            HTMLButtonElement.style.background = "#eee";
            break;
          case "1":
            HTMLButtonElement.style.background = "#6E6";
            break;
          case "2":
            HTMLButtonElement.style.background = "#ff7";
            break;
          case "3":
            HTMLButtonElement.style.background = "#fff";
            break;
          case "4":
            HTMLButtonElement.style.background = "#B2F66F";
            break;
        }

        HTMLButtonElement.style.border = "1px solid #555";
        HTMLButtonElement.style.margin = "0 2px";
      },
    },
  };

  calendarBtn.onclick = () => {
    console.log("open calendar");

    calendar.show();
    calendarWrapper.style.display = "block";
  };

  const calendar = new VanillaCalendar("#calendar", options);

  getTransCache()
    .then((data) => {
      transCache = data;
    })
    .then(() => {
      calendar.init();
      calendar.hide();
      calendarWrapper.style.display = "none";
    });

  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(calendarBtn) &&
      !e.composedPath().includes(calendarWrapper)
    ) {
      calendar.hide();
      calendarWrapper.style.display = "none";
    }
  });
});
//---------------------------------------------------------------------------------------
const changeView = (value) => {
  value.then((json) => {
    console.log(json);

    if (json.rus_pic_url) {
      console.log("rus");

      stripImgRus = `url(${json.rus_pic_url})`;
      stripMainImg.style.backgroundImage = stripImgRus;
    } else {
      stripImgRus = "url(img/not-3.png)";
      stripMainImg.style.backgroundImage = stripImgRus;
    }

    if (json.eng_pic_url) {
      console.log("eng");
      stripImgEng = `url(${json.eng_pic_url})`;
    }

    stripMain.style.height = `${json.height}px`;

    if (!json.blog) {
      blog.style.display = "none";
    } else {
      blog.style.display = "block";
    }
    if (!json.text_rus) {
      console.log(json.text_rus);

      translationItemRus.style.display = "none";
    } else {
      translationItemRus.style.display = "flex";
    }
    if (!json.text_original) {
      translationItemEng.style.display = "none";
    } else {
      translationItemEng.style.display = "flex";
    }

    blogMessage.innerHTML = json.blog;

    blogDate.innerHTML = `${json.tr_dt.slice(6, 8)}/${json.tr_dt.slice(
      4,
      6
    )}/${json.tr_dt.slice(0, 4)}`;

    translationTitle.innerHTML = `Выпуск комикса за ${currentDate.slice(
      6,
      8
    )}.${currentDate.slice(4, 6)}.${currentDate.slice(0, 4)} `;

    translationDesc.innerHTML = `Здесь представлен перевод старого комикса за ${currentDate.slice(
      6,
      8
    )}.${currentDate.slice(4, 6)}.${currentDate.slice(0, 4)} `;

    translationItemDescEng.innerHTML = json.text_original;
    translationItemDescRus.innerHTML = json.text_rus;
  });
};

changeView(getJson(currentDate));

//---------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------

let checkboxLanguage = document.querySelector(".checkbox__language");

checkboxLanguage.addEventListener("change", function () {
  const arrClasses = [];
  stripMainImg.classList.forEach((item) => arrClasses.push(item));

  console.log(arrClasses);
  console.log(arrClasses.includes("strip__main__img__rus"));

  if (arrClasses.includes("strip__main__img__rus")) {
    console.log(stripMainImg.style.backgroundImage);

    stripMainImg.style.backgroundImage = stripImgEng;
  }
  if (arrClasses.includes("strip__main__img__eng")) {
    console.log(stripMainImg.style.backgroundImage);
    stripMainImg.style.backgroundImage = stripImgRus;
  }

  stripMainImg.classList.toggle("strip__main__img__rus");
  stripMainImg.classList.toggle("strip__main__img__eng");
});

//---------------------------------------------------------------------------------------

let heart = document.querySelector(".strip__likes__heart");

heart.onclick = () => {
  heart.classList.toggle("strip__likes__heart-liked");
};

//--------------------------------------------------------------------------------------

let popUp = document.querySelector(".translation__proposal__title");

popUp.onclick = () => {
  document
    .querySelector(".translation__proposal__popup")
    .classList.toggle("open");
};

//--------------------------------------------------------------------------------------
