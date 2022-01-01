export const timeFormat = (dateTime) => {
  var date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
};

export const dayFormat = (date) => {
  //format the day date form one digit to 2digit, 12/1, 12/01
  let dayDate = date.getDate();
  dayDate = dayDate <= 9 ? "0" + dayDate : dayDate;
  return dayDate;
};

export const getFullYear = (date) => {
  return date.split("T")[0];
};
