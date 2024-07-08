import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";
import {
	CheckProgress,
	GetAllPhotos,
	updateProgress,
	updateProgressInput,
} from "../../types/api-types";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
	tagTypes: ["Photo"],
	endpoints: (builder) => ({
		getProgress: builder.query<CheckProgress, void>({
			query: () => {
				return {
					url: "progress/my",
					credentials: "include",
				};
			},
			keepUnusedDataFor: 0,
			providesTags: ["Photo"],
		}),
		todayProgress: builder.query<Omit<CheckProgress, "days">, void>({
			query: () => {
				return {
					url: "progress/today",
					credentials: "include",
				};
			},
			keepUnusedDataFor: 0,
			providesTags: ["Photo"],
		}),
		updateProgress: builder.mutation<updateProgress, updateProgressInput>({
			query: ({ formData }) => {
				return {
					url: "progress/update",
					method: "PUT",
					credentials: "include",
					body: formData,
				};
			},
			invalidatesTags: ["Photo"],
		}),
		resetProgress: builder.mutation<updateProgress, void>({
			query: () => {
				return {
					url: "progress/reset",
					method: "PUT",
					credentials: "include",
				};
			},
			invalidatesTags: ["Photo"],
		}),
		getPhotos: builder.query<GetAllPhotos, void>({
			query: () => {
				return {
					url: "photo/my",
					credentials: "include",
				};
			},
			keepUnusedDataFor: 0,
			providesTags: ["Photo"],
		}),
	}),
});

export const {
	useGetProgressQuery,
	useTodayProgressQuery,
	useUpdateProgressMutation,
	useResetProgressMutation,
	useGetPhotosQuery,
} = api;
