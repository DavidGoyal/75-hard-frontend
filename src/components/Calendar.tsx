/* eslint-disable react-refresh/only-export-components */
import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { memo } from "react";
import toast from "react-hot-toast";
import { useGetProgressQuery } from "../redux/api/api";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/reducers/miscReducer";

const Calendar = () => {
	const dispatch = useDispatch();
	const { data, isLoading, isError } = useGetProgressQuery();

	if (isError) {
		return toast.error("Cannot Fetch Progress");
	}
	return isLoading ? (
		<Skeleton sx={{ height: "60%", width: "50%" }} />
	) : (
		<Paper
			sx={{
				height: "60%",
				width: "50%",
				bgcolor: "white",
				borderRadius: "20px",
				padding: "1rem",
				position: "relative",
			}}
			elevation={20}
		>
			<Typography
				fontWeight={700}
				fontFamily={"monospace"}
				sx={{
					borderBottom: "1px solid black",
					marginBottom: "1rem",
					textAlign: "center",
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
			>
				{Array.from({ length: 75 }).map((_, i) => (
					<Button
						variant={i < (data?.days as number) ? "contained" : "text"}
						color="error"
						sx={{ borderRadius: "50%" }}
						key={i}
					>
						{i + 1}
					</Button>
				))}
			</Stack>
			<Button
				sx={{ color: "black", position: "absolute", bottom: 0, right: 0 }}
				onClick={() => dispatch(setOpen(true))}
			>
				Rules
			</Button>
		</Paper>
	);
};

export default memo(Calendar);
