import { Stack } from "@mui/material";
import Calendar from "./Calendar";
import Progress from "./Progress";

const SideBar = () => {
	return (
		<Stack
			alignItems={"center"}
			height={"100%"}
			padding={"2rem"}
			justifyContent={"space-around"}
		>
			<Calendar />
			<Progress />
		</Stack>
	);
};

export default SideBar;
