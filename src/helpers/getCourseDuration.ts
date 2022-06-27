export const getCourseDuration = (number: number) => {
	const minutes = number % 60;
	const hours = Math.floor(number / 60);

	const isMore9 = (num: number) => (num > 9 ? num : `0${num}`);
	const formatHours = isMore9(hours);
	const formatMinutes = isMore9(minutes);

	if (hours > 1 && hours < 10) {
		return `${formatHours}:${formatMinutes} hours`;
	} else if (hours > 10) {
		return `${formatHours}:${formatMinutes} hours`;
	} else {
		return `${formatHours}:${formatMinutes} hour`;
	}
};
