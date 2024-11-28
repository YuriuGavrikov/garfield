export const getJson = async (currentDate) => {
  let data = {};
  await fetch(`https://garfield-archive.ru/api.php?id=${currentDate}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      data = json.strip;
    })
    .catch((err) => console.log(err));
  return data;
};

export const getTransCache = async () => {
  let data = {};
  await fetch(`https://garfield-archive.ru/trans_cache.php`)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json[2024]);

      data = json;
    })
    .catch((err) => console.log(err));
  return data;
};

export const getOrdinalNumberDay = (date) => {
  let now = new Date(date);
  // console.log(now);

  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let result = Math.floor(diff / oneDay);
  return result;
};

export const getLastDateString = () => {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day - 1}`;
};
