export function currentNavBarDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let time = new Date();
  let day_word = days[time.getDay()];
  let day = String(time.getDate()).padStart(2, "0");
  let month = String(time.getMonth()).padStart(2, "0");
  let year = String(time.getFullYear());

  return `${day_word} | ${day}/${month}/${year}`;
}

export function currentNavBarTime() {
  let time = new Date();
  let hour = String(time.getHours()).padStart(2, "0");
  let minute = String(time.getMinutes()).padStart(2, "0");
  let second = String(time.getSeconds()).padStart(2, "0");

  return `${hour}:${minute}:${second}`;
}
