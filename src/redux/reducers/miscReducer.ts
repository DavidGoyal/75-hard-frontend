import { createSlice } from "@reduxjs/toolkit";

type Props = {
	isOpen: boolean;
	isMobileOpen: boolean;
	isTaskDialogOpen: boolean;
};

const initialState: Props = {
	isOpen: false,
	isMobileOpen: false,
	isTaskDialogOpen: false,
};

const miscReducer = createSlice({
	name: "misc",
	initialState,
	reducers: {
		setOpen: (state, action) => {
			state.isOpen = action.payload;
		},
		setMobileOpen: (state, action) => {
			state.isMobileOpen = action.payload;
		},
		setTaskDialogOpen: (state, action) => {
			state.isTaskDialogOpen = action.payload;
		},
	},
});

export default miscReducer;
export const { setOpen, setMobileOpen, setTaskDialogOpen } =
	miscReducer.actions;
