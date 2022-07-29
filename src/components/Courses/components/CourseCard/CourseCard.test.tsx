import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CourseCard } from './CourseCard';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';

const mockProps = {
	id: 'id',
	title: 'React JS',
	description: 'Framework for JavaScript',
	creationDate: '01.01.2020',
	duration: '120',
	authors: ['Anton', 'Dima'],
};

const renderComponent = () => {
	return render(
		<Provider store={store}>
			<Router>
				<CourseCard {...mockProps} />
			</Router>
		</Provider>
	);
};

describe('CourseCard component', () => {
	it('renders correctly', () => {
		const { getByText } = renderComponent();
		expect(getByText(mockProps.title)).toBeInTheDocument();
		expect(getByText(mockProps.description)).toBeInTheDocument();
		expect(getByText(mockProps.creationDate)).toBeInTheDocument();
		expect(getByText(mockProps.duration)).toBeInTheDocument();
		expect(getByText(mockProps.authors.join(', '))).toBeInTheDocument();
	});
});
