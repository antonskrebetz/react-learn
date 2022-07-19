export interface ICourse {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface IAuthor {
	id: string;
	name: string;
}

export interface IFulfilledCoursesAction {
	result: ICourse[];
	successful: boolean;
}

export interface IFulfilledAuthorsAction {
	result: IAuthor[];
	successful: boolean;
}

export interface IFulfilledLoginUser {
	successful: boolean;
	user: {
		name: string;
		email: string;
	};
	result: string;
}

export interface IFulfilledUsersMe {
	successful: boolean;
	result: {
		name: string;
		email: string;
		password: string;
		role: string;
		id: string;
	};
}

export interface IFulfilledCreateCourse {
	successful: boolean;
	result: {
		title: string;
		description: string;
		duration: number;
		authors: string[];
		creationDate: string;
		id: string;
	};
}

export interface IFulfilledDeleteCourse {
	successful: boolean;
	result: string;
}

export interface IFulfilledAddAuthors {
	successful: boolean;
	result: {
		name: string;
		id: string;
	};
}
