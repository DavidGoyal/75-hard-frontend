/* eslint-disable react-refresh/only-export-components */
import { Box, Paper, Skeleton, Stack } from "@mui/material";
import CircularProgress, {
	CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { useGetProgressQuery } from "../redux/api/api";

function CircularProgressWithLabel(
	props: CircularProgressProps & { value: number }
) {
	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress
				variant="determinate"
				{...props}
				sx={{ height: "100%", color: "white" }}
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
					color="white"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

const Progress = () => {
	const { data, isLoading } = useGetProgressQuery();
	const days = data?.days as number;

	const progress = (days / 75) * 100;

	return isLoading ? (
		<Skeleton sx={{ height: "100%", width: { xs: "70%", sm: "25%" } }} />
	) : (
		<Paper
			sx={{
				height: "100%",
				width: { xs: "70%", sm: "25%" },
				padding: "1rem",
				borderRadius: "20px",
				backgroundColor: "#01796F",
			}}
			elevation={10}
		>
			<Stack spacing={{ sm: "1rem", md: "1.5rem" }}>
				<Stack>
					<Typography fontWeight={700} fontFamily={"monospace"} color={"white"}>
						Total Tasks
					</Typography>
					<Typography
						fontWeight={700}
						fontFamily={"monospace"}
						color={"white"}
						fontSize={"1.5rem"}
					>
						{days * 5}
					</Typography>
				</Stack>
				<Stack
					direction={"column"}
					justifyContent={"space-evenly"}
					gap={"2rem"}
					alignItems={"center"}
				>
					<CircularProgressWithLabel value={progress} />
					<Typography
						sx={{
							border: "5px solid white",
							borderRadius: "100%",
							height: "5rem",
							width: "5rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							textAlign: "center",
							color: "white",
						}}
					>
						<Stack>
							<b>{days}/75</b>
							<Typography>days</Typography>
						</Stack>
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default memo(Progress);
