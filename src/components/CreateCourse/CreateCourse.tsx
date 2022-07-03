import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { IAuthor, ICourse } from '../../mockData';
import { getCourseDuration } from '../../helpers';
import styles from './CreateCourse.module.css';
import { v4 as uuidv4 } from 'uuid';

interface ICreateCourseProps {
	allAppAuthors: IAuthor[];
	onHandleAddAuthor: (name: string) => void;
	courses: ICourse[];
	setCourses: Dispatch<SetStateAction<ICourse[]>>;
}

export const CreateCourse = ({
	allAppAuthors,
	onHandleAddAuthor,
	courses,
	setCourses,
}: ICreateCourseProps) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [descriptionError, setDescriptionError] = useState(false);
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>([]);
	const [createAuthor, setCreateAuthor] = useState('');
	const [duration, setDuration] = useState(0);

	const navigate = useNavigate();
	const handleAddNewCourse = (course: ICourse) => {
		if (
			course.title.length < 2 ||
			course.description.length < 2 ||
			course.duration === 0 ||
			course.authors.length < 1
		) {
			alert('Please, fill in all fields');
		} else {
			setCourses([...courses, course]);
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
					buttonText='Create course'
					onClick={() =>
						handleAddNewCourse({
							id: uuidv4(),
							creationDate: new Date().toLocaleDateString(),
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
							onClick={() => {
								onHandleAddAuthor(createAuthor);
								setCreateAuthor('');
							}}
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
