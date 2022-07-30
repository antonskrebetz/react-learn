export const getCourseDuration = (number: number | undefined) => {
	if (number === undefined) {
		return null;
	}
	const minutes = number % 60;
	const hours = Math.floor(number / 60);

	const isMore9 = (num: number) => (num > 9 ? num : `0${num}`);
	const formatHours = isMore9(hours);
	const formatMinutes = isMore9(minutes);

	return `${formatHours}:${formatMinutes} ${hours > 1 ? 'hours' : 'hour'}`;
};
