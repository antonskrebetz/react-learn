import { CourseCard } from './components/CourseCard/CourseCard';
import { getCourseDuration, formatCreationDate } from '../../helpers';
import { ICourse, IAuthor } from '../../mockData';

interface ICoursesProps {
	courses: ICourse[];
	authors: IAuthor[];
}

export const Courses = ({ courses, authors }: ICoursesProps) => {
	return (
		<div>
			{courses.map((course) => {
				const authorsForCard = course.authors.map((authorId: string) => {
					return authors.filter((author) => author.id === authorId)[0].name;
				});

				const duration = getCourseDuration(course.duration || 0);
				const creationDate = formatCreationDate(course.creationDate);

				return (
					<CourseCard
						key={course.id}
						title={course.title}
						description={course.description}
						creationDate={creationDate}
						duration={duration}
						authors={authorsForCard}
					/>
				);
			})}
		</div>
	);
};
