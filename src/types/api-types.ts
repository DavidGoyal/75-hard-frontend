import { PhotoType, UserType } from "./types";

export type CheckProgress = {
	success: boolean;
	days: number;
};

export type updateProgress = {
	success: boolean;
	message: string;
};

export type UserResponse = {
	success: boolean;
	message: string;
	user: UserType;
};

export type UserInput = {
	email: string;
	password: string;
};

export type GetAllPhotos = {
	success: boolean;
	photos: PhotoType[];
};

export type updateProgressInput = {
	formData: FormData;
};
