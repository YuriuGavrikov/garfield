const data = {
  imgRus: "",
  imgEng: "",
  translatorNotes: "",
  translatorNotesDate: "",
  originalText: "",
  translationText: "",
};

let currentDate = "20181024";

const getData = async (currentDate) => {
  await fetch(`https://garfield-archive.ru/api.php?id=${currentDate}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      if (json.strip.rus_pic_url) {
        console.log("rus");
        data.imgRus = `url(${json.strip.rus_pic_url})`;
        stripMainImg.style.backgroundImage = data.imgRus;
      } else {
        data.imgRus = "url(/img/not-3.png)";
        stripMainImg.style.backgroundImage = data.imgRus;
      }

      if (json.strip.eng_pic_url) {
        console.log("eng");
        data.imgEng = `url(${json.strip.eng_pic_url})`;
      }

      stripMain.style.height = `${json.strip.height}px`;

      if (!json.strip.blog) {
        blog.style.display = "none";
      } else {
        blog.style.display = "block";
      }
      if (!json.strip.text_rus) {
        console.log(json.strip.text_rus);

        translationItemRus.style.display = "none";
      } else {
        translationItemRus.style.display = "flex";
      }
      if (!json.strip.text_original) {
        translationItemEng.style.display = "none";
      } else {
        translationItemEng.style.display = "flex";
      }

      data.translatorNotes = json.strip.blog;
      blogMessage.innerHTML = data.translatorNotes;

      data.translatorNotesDate = json.strip.tr_dt;
      blogDate.innerHTML = `${data.translatorNotesDate.slice(
        6,
        8
      )}/${data.translatorNotesDate.slice(
        4,
        6
      )}/${data.translatorNotesDate.slice(0, 4)}`;

      data.originalText = json.strip.text_rus;
      translationItemDescRus.innerHTML = data.originalText;

      data.translationText = json.strip.text_original;
      translationItemDescEng.innerHTML = data.translationText;
    });
};
getData(currentDate);
console.log(data);
//--------------------------------------------------------------------------------------
let stripMain = document.querySelector(".strip__main");
let stripMainImg = document.querySelector(".strip__main__img");

let likes = document.querySelector(".strip__likes__heart");

let blog = document.querySelector(".blog");
let blogMessage = document.querySelector(".blog__message");
let blogDate = document.querySelector(".blog__date_js");

let translationItemRus = document.querySelector(".translation__item_rus");
let translationItemEng = document.querySelector(".translation__item_eng");
let translationItemDescRus = document.querySelector(
  ".translation__item__desc_rus"
);
let translationItemDescEng = document.querySelector(
  ".translation__item__desc_eng"
);

let checkboxLanguage = document.querySelector(".checkbox__language");

checkboxLanguage.addEventListener("change", function () {
  const arrClasses = [];
  stripMainImg.classList.forEach((item) => arrClasses.push(item));

  console.log(arrClasses);
  console.log(arrClasses.includes("strip__main__img__rus"));

  if (arrClasses.includes("strip__main__img__rus")) {
    console.log(stripMainImg.style.backgroundImage);

    stripMainImg.style.backgroundImage = data.imgEng;
  }
  if (arrClasses.includes("strip__main__img__eng")) {
    console.log(stripMainImg.style.backgroundImage);
    stripMainImg.style.backgroundImage = data.imgRus;
  }

  stripMainImg.classList.toggle("strip__main__img__rus");
  stripMainImg.classList.toggle("strip__main__img__eng");
});
//---------------------------------------------------------------------------------------
let calendarBtn = document.querySelector(".user-menu__calendar__btn");
let calendarWrapper = document.querySelector(".calendar__wrapper");

document.addEventListener("DOMContentLoaded", () => {
  const options = {
    settings: {
      lang: "ru",
    },
    actions: {
      clickDay(event, self) {
        currentDate = self.selectedDates[0].split("-").join("");
        console.log(self.selectedDates[0].split("-").join(""));
        calendar.hide();
        calendarWrapper.style.display = "none";
        getData(currentDate);
      },
    },
  };

  calendarBtn.onclick = () => {
    console.log(calendar);

    calendar.show();
    calendarWrapper.style.display = "block";
  };

  const calendar = new VanillaCalendar("#calendar", options);
  calendar.init();
  calendar.hide();
  calendarWrapper.style.display = "none";
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
