export const TimeFormat = (dateTime) => {
	var date = new Date(dateTime);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const dayFormat = (date) => {
	//format the day date form one digit to 2digit, 12/1, 12/01
	let dayDate = date.getDate();
	dayDate = dayDate <= 9 ? "0" + dayDate : dayDate;
	return dayDate;
};
