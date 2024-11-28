import {
  getJson,
  getTransCache,
  getOrdinalNumberDay,
  getLastDateString,
} from "./get.js";

let transCache = {};

//---------------------------------------------------------------------------------------
const strip = {
  currentDate: "20181024",
  imgRus: "url(img/not-3.png)",
  imgEng: "url(img/not-3.png)",
};

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

let checkboxLanguage = document.querySelector(".checkbox__language");
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
        strip.currentDate = self.selectedDates[0].split("-").join("");

        calendarWrapper.style.animation = "closeCalendar 0.5s ease forwards";

        changeView(getJson(strip.currentDate));
        stripDateInner.innerHTML = `${strip.currentDate.slice(
          6,
          8
        )}/${strip.currentDate.slice(4, 6)}/${strip.currentDate.slice(0, 4)}`;

        console.log(strip.currentDate);
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

  stripDateInner.onclick = () => {
    console.log("open calendar");

    calendar.show();
    calendarWrapper.style.animation = "openCalendar 0.5s ease forwards";
  };

  const calendar = new VanillaCalendar("#calendar", options);

  getTransCache()
    .then((data) => {
      transCache = data;
    })
    .then(() => {
      calendar.init();

      calendar.hide();
    });

  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(stripDateInner) &&
      !e.composedPath().includes(calendarWrapper)
    ) {
      if (calendarWrapper.style.animation) {
        calendarWrapper.style.animation = "closeCalendar 0.5s ease forwards";
      }
    }
  });
});
//---------------------------------------------------------------------------------------

const changeView = (value) => {
  value.then((json) => {
    console.log(json);

    if (json.rus_pic_url) {
      console.log("rus");

      strip.imgRus = `url(${json.rus_pic_url})`;
      stripMainImg.style.backgroundImage = strip.imgRus;
    } else {
      strip.imgRus = [
        `url(img/not-3.png)`,
        `url(img/not-v2.png)`,
        `url(${json.eng_pic_url})`,
      ];
      stripMainImg.style.backgroundImage = strip.imgRus;
      stripMainImg.style.backgroundPosition = [
        "center",
        "-330px -644px",
        "center",
      ];
    }

    if (json.eng_pic_url) {
      console.log("eng");
      strip.imgEng = `url(${json.eng_pic_url})`;
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

    translationTitle.innerHTML = `Выпуск комикса за ${strip.currentDate.slice(
      6,
      8
    )}.${strip.currentDate.slice(4, 6)}.${strip.currentDate.slice(0, 4)} `;

    translationDesc.innerHTML = `Здесь представлен перевод старого комикса за ${strip.currentDate.slice(
      6,
      8
    )}.${strip.currentDate.slice(4, 6)}.${strip.currentDate.slice(0, 4)} `;

    translationItemDescEng.innerHTML = json.text_original;
    translationItemDescRus.innerHTML = json.text_rus;

    checkboxLanguage.checked = false;
    stripMainImg.classList.replace(
      "strip__main__img__eng",
      "strip__main__img__rus"
    );
  });
};

changeView(getJson(strip.currentDate));

//--------------------------------------------------------------------------------------

checkboxLanguage.addEventListener("change", function () {
  const arrClasses = [];
  stripMainImg.classList.forEach((item) => arrClasses.push(item));

  console.log(arrClasses);
  console.log(arrClasses.includes("strip__main__img__rus"));

  if (checkboxLanguage.checked) {
    stripMainImg.style.backgroundImage = strip.imgEng;
  } else {
    stripMainImg.style.backgroundImage = strip.imgRus;
  }
  stripMainImg.classList.toggle("strip__main__img__eng");
  stripMainImg.classList.toggle("strip__main__img__rus");
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
