export const formatCreationDate = (date: string | undefined) => {
	if (date === undefined) {
		return null;
	}
	return date.replaceAll('/', '.');
};
