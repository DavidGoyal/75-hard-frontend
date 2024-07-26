import { Button, Stack } from "@mui/material";
import Calendar from "./Calendar";
import OtherTasks from "./OtherTasks";
import { setOpen } from "../redux/reducers/miscReducer";
import HelpIcon from "@mui/icons-material/Help";
import { useDispatch } from "react-redux";

const SideBar = () => {
	const dispatch = useDispatch();
	return (
		<Stack
			alignItems={"center"}
			height={"100%"}
			padding={"2rem"}
			gap={"2.5rem"}
			justifyContent={"space-around"}
			position={"relative"}
		>
			<Calendar />
			<OtherTasks />
			<Button
				sx={{
					color: "black",
					position: "absolute",
					bottom: 3,
					right: 0,
				}}
				onClick={() => dispatch(setOpen(true))}
			>
				<HelpIcon sx={{ fontSize: "2rem" }} />
			</Button>
		</Stack>
	);
};

export default SideBar;
