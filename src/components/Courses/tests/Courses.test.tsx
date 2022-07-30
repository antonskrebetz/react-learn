import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Courses } from '../Courses';

const coursesMock = [
	{
		title: 'React JS',
		description: 'Framework for JavaScript',
		duration: 130,
		authors: [
			'1c972c52-3198-4098-b6f7-799b45903199',
			'1c972c52-3198-4098-b6f7-799b45903199',
		],
		creationDate: '17/07/2022',
		id: '54595371-7cf1-4db9-b2d9-749676bb8c49',
	},
	{
		title: 'Next JS',
		description: 'New framework from USA',
		duration: 30,
		authors: [
			'1c972c52-3198-4098-b6f7-799b45903199',
			'1c972c52-3198-4098-b6f7-799b45903199',
		],
		creationDate: '10/10/2022',
		id: '22222222-7cf1-4db9-b2d9-749676bb8c49',
	},
];

const authorsMock = [
	{
		name: 'author',
		id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
	},
	{
		name: 'author2',
		id: '1c972c52-3198-4098-b6f7-799b45903199',
	},
	{
		name: 'author3',
		id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
	},
];

jest.mock('../../../store/selectors', () => {
	const originalModule = jest.requireActual('../../../store/selectors');

	return {
		...originalModule,
		getCourses: () => coursesMock,
		getAuthorsLoading: () => 'idle',
		getCoursesLoading: () => 'idle',
		getAuthors: () => authorsMock,
	};
});

const renderComponent = () => {
	return render(
		<Provider store={store}>
			<Router>
				<Courses />
			</Router>
		</Provider>
	);
};

describe('Courses component', () => {
	it('returns courses length', () => {
		const { getAllByTestId } = renderComponent();
		expect(getAllByTestId('course-card')).toHaveLength(2);
	});
});
