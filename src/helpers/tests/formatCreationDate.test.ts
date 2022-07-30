import { formatCreationDate } from '../formatCreationDate';

describe('formatCreation util', () => {
	it('returns null if data is not provided', () => {
		expect(formatCreationDate(undefined)).toBeNull();
	});

	it('returns correct data format', () => {
		expect(formatCreationDate('01/01/2020')).toBe('01.01.2020');
	});
});
