import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { IAuthor } from '../../mockData';
import { getCourseDuration } from '../../helpers';
import styles from './CreateCourse.module.css';
import {
	fetchCreateCourse,
	fetchUpdateCourse,
} from '../../store/courses/coursesSlice';
import { fetchAddAuthors } from '../../store/authors/authorsSlice';

interface ICreateCourseProps {
	isUpdate: boolean;
}

export const CreateCourse = ({ isUpdate }: ICreateCourseProps) => {
	let { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const allAppCourses = useAppSelector(
		(state) => state.coursesReducer.coursesData
	);
	const allAppAuthors = useAppSelector(
		(state) => state.authorsReducer.authorsData
	);
	const userToken = useAppSelector((state) => state.userReducer.token);

	const currentUpdateCourse = allAppCourses.find(
		(course) => course.id === courseId
	);
	const authorsUpdateCourse = currentUpdateCourse?.authors.map((author) =>
		allAppAuthors.find((el) => el.id === author)
	);

	const [title, setTitle] = useState(
		isUpdate ? currentUpdateCourse?.title : ''
	);
	const [description, setDescription] = useState(
		isUpdate ? currentUpdateCourse?.description : ''
	);
	const [descriptionError, setDescriptionError] = useState(false);
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>(
		isUpdate ? (authorsUpdateCourse as []) : []
	);
	const [createAuthor, setCreateAuthor] = useState('');
	const [duration, setDuration] = useState(
		isUpdate ? currentUpdateCourse?.duration : 0
	);

	const courseAuthorsIds = courseAuthors.map((author) => author.id);

	const newCourse = JSON.stringify({
		title,
		description,
		duration,
		authors: courseAuthorsIds,
	});

	interface ICourseHandle {
		title: string | undefined;
		description: string | undefined;
		duration: number;
		authors: string[];
	}

	const handleAddNewCourse = async (course: ICourseHandle) => {
		if (
			!course.title ||
			course.title.length < 2 ||
			!course.description ||
			course.description.length < 2 ||
			course.duration === 0 ||
			course.authors.length < 1
		) {
			alert('Please, fill in all fields');
		} else if (!isUpdate) {
			await dispatch(
				fetchCreateCourse({ course: newCourse, token: userToken })
			);
			navigate('/courses');
		} else {
			await dispatch(
				fetchUpdateCourse({
					course: newCourse,
					id: courseId as string,
					token: userToken,
				})
			);
			navigate('/courses');
		}
	};

	const handleTitle = (value: string) => {
		setTitle(value);
	};

	const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(event.target.value);
		if (event.target.value.length < 2) {
			setDescriptionError(true);
		} else {
			setDescriptionError(false);
		}
	};

	const handleNameAuthor = (value: string) => {
		setCreateAuthor(value);
	};

	const onClickAddAuthor = async (name: string) => {
		if (name.length < 2) {
			return name;
		}

		const fetchName = JSON.stringify({ name });
		await dispatch(fetchAddAuthors({ name: fetchName, token: userToken }));
		setCreateAuthor('');
	};

	const handleDuration = (value: string) => {
		if (!value) {
			setDuration(0);
		}
		const time = Number(value);
		time && setDuration(time);
	};

	const handleAddCourseAuthor = ({ name, id }: IAuthor) => {
		setCourseAuthors([
			...courseAuthors,
			{
				name,
				id,
			},
		]);
	};

	const handleDeleteCourseAuthor = ({ id }: IAuthor) => {
		setCourseAuthors(courseAuthors.filter((el) => el.id !== id));
	};

	const idsCourseAuthors = useMemo(
		() => courseAuthors.map((el) => el.id),
		[courseAuthors]
	);

	const filterAllAppAuthors = useMemo(() => {
		return courseAuthors.length
			? allAppAuthors.filter(({ id }) => !idsCourseAuthors.includes(id))
			: allAppAuthors;
	}, [allAppAuthors, courseAuthors, idsCourseAuthors]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Input
					id={'course_title'}
					labelText={'Title'}
					placeholderText='Enter title'
					onChange={handleTitle}
					value={title}
				/>
				<Button
					addClass={styles.createBtn}
					buttonText={isUpdate ? 'Update course' : 'Create course'}
					onClick={() =>
						handleAddNewCourse({
							title,
							description,
							duration: duration || 0,
							authors: idsCourseAuthors,
						})
					}
				/>
			</div>
			<div className={styles.description}>
				<label className={styles.textareaLabel} htmlFor='textarea'>
					Description
				</label>
				<textarea
					className={styles.textarea}
					name='textarea'
					id='textarea'
					cols={30}
					rows={7}
					placeholder={'Enter description...'}
					value={description}
					onChange={handleDescription}
				/>
				{descriptionError && (
					<div style={{ marginTop: '3px', color: 'red', fontSize: '10px' }}>
						The length should be more than 2 symbols
					</div>
				)}
			</div>
			<div className={styles.content}>
				<div className={styles.row}>
					<div className={styles.sectionInfo}>
						<h3 className={styles.sectionTitle}>Add author</h3>
						<Input
							addClass={styles.contentInput}
							id={'course_author'}
							labelText={'Author name'}
							placeholderText={'Enter author name...'}
							onChange={handleNameAuthor}
							value={createAuthor}
						/>
						<Button
							buttonText={'Create author'}
							onClick={() => onClickAddAuthor(createAuthor)}
						/>
					</div>
					<div className={styles.sectionInfo}>
						<h3 className={styles.sectionTitle}>Authors</h3>
						{filterAllAppAuthors.map((el) => (
							<AuthorItem
								key={el.id}
								name={el.name}
								buttonText={'Add author'}
								onClick={() => handleAddCourseAuthor(el)}
							/>
						))}
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.sectionInfo}>
						<h3 className={styles.sectionTitle}>Duration</h3>
						<Input
							addClass={styles.contentInput}
							id={'course_duration'}
							labelText={'Duration'}
							placeholderText={'Enter duration in minutes...'}
							onChange={handleDuration}
							value={!duration ? '' : duration}
							durationInput
						/>
						<div>
							Duration:
							<span className={styles.counterTime}>
								{duration ? getCourseDuration(duration) : '00:00 hours'}
							</span>
						</div>
					</div>
					<div className={styles.sectionInfo}>
						<h3 className={styles.sectionTitle}>Course authors</h3>
						{courseAuthors.length ? (
							courseAuthors.map((el: IAuthor) => (
								<AuthorItem
									key={el.id}
									name={el.name}
									buttonText={'Delete author'}
									onClick={() => handleDeleteCourseAuthor(el)}
								/>
							))
						) : (
							<div>Author list is empty</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
