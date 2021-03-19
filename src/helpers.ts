export const getClientX = (e: MouseEvent | TouchEvent) => {
	if (e instanceof MouseEvent) {
		return e.clientX;
	}

	if (e instanceof TouchEvent) {
		return e.touches[0].clientX;
	}

	return 0;
};
