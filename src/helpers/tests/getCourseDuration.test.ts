import { getCourseDuration } from '../getCourseDuration';

describe('getCourseDuration util', () => {
	it('returns null if data is not provided', () => {
		expect(getCourseDuration(undefined)).toBeNull();
	});

	it('returns correct format for 30 min', () => {
		expect(getCourseDuration(30)).toBe('00:30 hour');
	});

	it('returns correct format for 60 min', () => {
		expect(getCourseDuration(60)).toBe('01:00 hour');
	});

	it('returns correct format for 120 min', () => {
		expect(getCourseDuration(120)).toBe('02:00 hours');
	});

	it('returns correct format for 700 min', () => {
		expect(getCourseDuration(700)).toBe('11:40 hours');
	});
});
