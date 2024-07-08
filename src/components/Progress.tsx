/* eslint-disable react-refresh/only-export-components */
import { Box, Paper, Skeleton, Stack } from "@mui/material";
import CircularProgress, {
	CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import toast from "react-hot-toast";
import { useGetProgressQuery } from "../redux/api/api";

function CircularProgressWithLabel(
	props: CircularProgressProps & { value: number }
) {
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress
				variant="determinate"
				{...props}
				sx={{ height: "100%", color: "tomato" }}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="caption"
					component="div"
					color="text.secondary"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

const Progress = () => {
	const { data, isLoading, isError } = useGetProgressQuery();
	const days = data?.days as number;

	if (isError) {
		return toast.error("Cannot Fetch Progress");
	}

	const progress = (days / 75) * 100;

	return isLoading ? (
		<Skeleton sx={{ height: "22%", width: "50%" }} />
	) : (
		<Paper
			sx={{
				height: "22%",
				width: "50%",
				bgcolor: "white",
				padding: "1rem",
				borderRadius: "20px",
			}}
			elevation={20}
		>
			<Stack spacing={{ sm: "1rem", md: "1.5rem" }}>
				<Typography
					textAlign={"center"}
					sx={{ borderBottom: "1px solid black" }}
					fontWeight={700}
					fontFamily={"monospace"}
				>
					Progress
				</Typography>
				<Stack
					direction={{ sm: "column", md: "row" }}
					justifyContent={"space-evenly"}
					alignItems={"center"}
				>
					<CircularProgressWithLabel value={progress} />
					<Typography
						sx={{
							border: "5px solid black",
							borderRadius: "60%",
							padding: "0.7rem",
						}}
					>
						{days}/75
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default memo(Progress);
