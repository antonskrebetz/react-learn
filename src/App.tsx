import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Courses } from './components/Courses/Courses';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { AuthComponent } from './components/AuthComponent/AuthComponent';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='/' element={<AuthComponent />}>
					<Route path='/' element={<Navigate to='/courses' />} />
					<Route path='courses' element={<Courses />} />
					<Route path='courses/add' element={<CreateCourse />} />
					<Route path='courses/:courseID' element={<CourseInfo />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
