import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/types";

type Props = {
	user: UserType | null;
	isLoading: boolean;
};

const initialState: Props = {
	user: null,
	isLoading: true,
};

const userReducer = createSlice({
	name: "user",
	initialState,
	reducers: {
		userExists: (state, action) => {
			state.isLoading = true;
			state.user = action.payload;
			state.isLoading = false;
		},
		userNotExists: (state) => {
			state.isLoading = true;
			state.user = null;
			state.isLoading = false;
		},
	},
});

export default userReducer;
export const { userExists, userNotExists } = userReducer.actions;
