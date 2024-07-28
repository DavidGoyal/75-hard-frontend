import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";
import {
	CheckProgress,
	GetAllPhotos,
	GetIncompleteTasks,
	GetMyTasks,
	newTaskInput,
	updateProgress,
	updateProgressInput,
	updateTaskInput,
	UserInput,
	UserResponse,
} from "../../types/api-types";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
	tagTypes: ["Photo", "Task"],
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, UserInput>({
			query: ({ email, password }) => {
				return {
					url: "user/login",
					method: "POST",
					credentials: "include",
					body: { email, password },
				};
			},
		}),
		register: builder.mutation<UserResponse, updateProgressInput>({
			query: ({ formData }) => {
				return {
					url: "user/new",
					method: "POST",
					credentials: "include",
					body: formData,
				};
			},
		}),
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
			invalidatesTags: ["Photo", "Task"],
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
		newTask: builder.mutation<updateProgress, newTaskInput>({
			query: ({ content }) => {
				return {
					url: "task/new",
					method: "POST",
					credentials: "include",
					body: { content },
				};
			},
			invalidatesTags: ["Task"],
		}),
		getTasks: builder.query<GetMyTasks, void>({
			query: () => {
				return {
					url: "task/my",
					credentials: "include",
				};
			},
			providesTags: ["Task"],
			keepUnusedDataFor: 0,
		}),
		updateTask: builder.mutation<updateProgress, updateTaskInput>({
			query: ({ id }) => {
				return {
					url: `task/${id}`,
					method: "PUT",
					credentials: "include",
				};
			},
		}),
		deleteTask: builder.mutation<updateProgress, updateTaskInput>({
			query: ({ id }) => {
				return {
					url: `task/${id}`,
					method: "DELETE",
					credentials: "include",
				};
			},
		}),
		completeTask: builder.query<GetIncompleteTasks, void>({
			query: () => {
				return {
					url: "task/complete",
					credentials: "include",
				};
			},
			keepUnusedDataFor: 0,
			providesTags: ["Task"],
		}),
		getLatestTasks: builder.query<GetMyTasks, void>({
			query: () => {
				return {
					url: "task/latest",
					credentials: "include",
				};
			},
			keepUnusedDataFor: 0,
			providesTags: ["Task"],
		}),
	}),
});

export const {
	useGetProgressQuery,
	useTodayProgressQuery,
	useUpdateProgressMutation,
	useResetProgressMutation,
	useGetPhotosQuery,
	useLoginMutation,
	useRegisterMutation,
	useNewTaskMutation,
	useGetTasksQuery,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
	useGetLatestTasksQuery,
	useCompleteTaskQuery,
} = api;
