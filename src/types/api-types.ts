import { PhotoType } from "./types";

export type CheckProgress = {
	success: boolean;
	days: number;
};

export type updateProgress = {
	success: boolean;
	message: string;
};

export type GetAllPhotos = {
	success: boolean;
	photos: PhotoType[];
};

export type updateProgressInput = {
	formData: FormData;
};
