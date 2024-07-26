export type UserType = {
	_id: string;
	name: string;
	email: string;
	avatar: {
		_id: string;
		url: string;
	};
	createdAt: string;
	updatedAt: string;
};

export type PhotoType = {
	_id: string;
	image: {
		_id: string;
		url: string;
	};
	user: string;
	createdAt: string;
	updatedAt: string;
};

export type TaskType = {
	id?: string;
	_id: string;
	content: string;
	completed: boolean;
	user: string;
	createdAt: string;
	updatedAt: string;
};
