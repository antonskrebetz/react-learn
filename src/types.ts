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
