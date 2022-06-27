import { useMemo, useState } from 'react';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { IAuthor, ICourse } from '../../mockData';
import { getCourseDuration } from '../../helpers';
import styles from './CreateCourse.module.css';
import { v4 as uuidv4 } from 'uuid';

interface ICreateCourseProps {
	allAppAuthors: IAuthor[];
	handleAddAuthor: (name: string) => void;
	handleAddNewCourse: (course: ICourse) => void;
}

export const CreateCourse = ({
	allAppAuthors,
	handleAddAuthor,
	handleAddNewCourse,
}: ICreateCourseProps) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [descriptionError, setDescriptionError] = useState(false);
	const [courseAuthors, setCourseAuthors] = useState<IAuthor[]>([]);
	const [createAuthor, setCreateAuthor] = useState('');
	const [duration, setDuration] = useState<number | ''>('');

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
		if (value === '') {
			setDuration('');
			return;
		}

		const time = Number.parseInt(value);
		Object.is(time, NaN) || setDuration(time);
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
								handleAddAuthor(createAuthor);
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
							value={duration}
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
