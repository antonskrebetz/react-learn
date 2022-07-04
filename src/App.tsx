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
import { useMemo, useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from './mockData';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [search, setSearch] = useState('');
	const [showSearchCourses, setShowSearchCourses] = useState(false);

	const handleSearchInput = (value: string) => {
		if (search === '') {
			setShowSearchCourses(false);
		}
		setSearch(value);
	};

	const handleClickSearchButton = () => {
		setShowSearchCourses(true);
	};

	const handleAddAuthor = (name: string) => {
		if (name.length < 2) {
			return name;
		}
		setAuthors([
			...authors,
			{
				name,
				id: uuidv4(),
			},
		]);
	};

	const filterCourses = useMemo(
		() =>
			courses.filter(
				(el) =>
					el.id.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
					el.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			),
		[search, courses]
	);

	return (
		<Router>
			<Header />
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='/' element={<AuthComponent />}>
					<Route path='/' element={<Navigate to='/courses' />} />
					<Route
						path='courses'
						element={
							<Courses
								courses={showSearchCourses ? filterCourses : courses}
								authors={authors}
								handleSearchInput={handleSearchInput}
								handleClickSearchButton={handleClickSearchButton}
								search={search}
							/>
						}
					/>
					<Route
						path='courses/add'
						element={
							<CreateCourse
								allAppAuthors={authors}
								onHandleAddAuthor={handleAddAuthor}
								courses={courses}
								setCourses={setCourses}
							/>
						}
					/>
					<Route
						path='courses/:courseID'
						element={<CourseInfo courses={courses} authors={authors} />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
