import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from './Header';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { getUserName } from '../../store/selectors';

jest.mock('../../store/selectors');
const getUserNameMock = getUserName as jest.Mock;

const renderComponent = () => {
	return render(
		<Provider store={store}>
			<Router>
				<Header />
			</Router>
		</Provider>
	);
};

describe('Test Header component', () => {
	it('has a logo', () => {
		const { getByAltText } = renderComponent();
		const img = getByAltText('logo');
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src');
	});

	it('has user name', () => {
		getUserNameMock.mockReturnValue('Anton');
		const { getByText } = renderComponent();
		const name = getByText(/Anton/i);
		expect(name).toBeInTheDocument();
	});
});
