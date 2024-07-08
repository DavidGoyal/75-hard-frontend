import { createSlice } from "@reduxjs/toolkit";

type Props = {
	isOpen: boolean;
};

const initialState: Props = {
	isOpen: false,
};

const miscReducer = createSlice({
	name: "misc",
	initialState,
	reducers: {
		setOpen: (state, action) => {
			state.isOpen = action.payload;
		},
	},
});

export default miscReducer;
export const { setOpen } = miscReducer.actions;
