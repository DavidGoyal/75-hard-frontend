import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import { api } from "./api/api";
import miscReducer from "./reducers/miscReducer";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[userReducer.name]: userReducer.reducer,
		[miscReducer.name]: miscReducer.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
