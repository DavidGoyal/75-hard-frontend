/* eslint-disable react-refresh/only-export-components */
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useGetProgressQuery } from "../redux/api/api";

const Calendar = () => {
	const { data, isLoading } = useGetProgressQuery();

	return isLoading ? (
		<Skeleton sx={{ height: "45%", width: "87%" }} />
	) : (
		<Paper
			sx={{
				height: "45%",
				width: "87%",
				bgcolor: "white",
				borderRadius: "20px",
				position: "relative",
			}}
			elevation={10}
		>
			<Typography
				fontWeight={700}
				fontFamily={"monospace"}
				sx={{
					borderBottom: "1px solid black",
					marginBottom: "1rem",
					textAlign: "center",
					marginTop: "1rem",
				}}
			>
				Day {(data?.days as number) + 1}
			</Typography>
			<Stack
				direction={"row"}
				width={"100%"}
				height={"80%"}
				flexWrap={"wrap"}
				sx={{ overflowY: "auto" }}
				justifyContent={"center"}
			>
				{Array.from({ length: 75 }).map((_, i) =>
					i < (data?.days as number) ? (
						<Button>
							<CheckCircleIcon key={i} sx={{ color: "#01796F" }} />
						</Button>
					) : (
						<Button color="error" sx={{ borderRadius: "50%" }} key={i}>
							{i + 1}
						</Button>
					)
				)}
			</Stack>
		</Paper>
	);
};

export default memo(Calendar);
