/* eslint-disable react-refresh/only-export-components */
import { Avatar, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { memo } from "react";
import toast from "react-hot-toast";
import {
	useGetLatestTasksQuery,
	useTodayProgressQuery,
} from "../redux/api/api";

const OtherTasks = () => {
	const { data, isLoading } = useGetLatestTasksQuery();
	const {
		data: todayTask,
		isLoading: todayTaskLoading,
		isError: todayTaskError,
	} = useTodayProgressQuery();

	if (todayTaskError) {
		return toast.error("Something went wrong");
	}

	return isLoading ? (
		<Skeleton sx={{ height: { md: "47%", lg: "38%" }, width: "87%" }} />
	) : (
		<Paper
			sx={{
				height: { md: "47%", lg: "38%" },
				width: "87%",
				bgcolor: "white",
				borderRadius: "20px",
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
				Latest Tasks
			</Typography>
			{todayTaskLoading ? (
				<Skeleton sx={{ width: "100%", height: "80%" }} />
			) : (
				<Stack
					direction={"column"}
					width={"100%"}
					height={"80%"}
					gap={"1.2rem"}
					paddingLeft={"1rem"}
					overflow={"auto"}
					justifyContent={todayTask?.success ? "center" : "initial"}
				>
					{data && data?.tasks?.length > 0 ? (
						data?.tasks.map((task) => (
							<TaskCard content={task.content} createdAt={task.createdAt} />
						))
					) : (
						<Typography textAlign={"center"}>
							{todayTask?.success
								? `Completed all of the today's tasks.`
								: "No Tasks added yet."}
						</Typography>
					)}
				</Stack>
			)}
		</Paper>
	);
};

const TaskCard = ({
	content,
	createdAt,
}: {
	content: string;
	createdAt: string;
}) => {
	const newDate = new Date(Date.now());
	const oldDate = new Date(createdAt);
	const diff = newDate.getTime() - oldDate.getTime();

	if (content.length > 22) {
		content = content.slice(0, 22) + "...";
	}
	return (
		<Stack direction={"row"} gap={"1rem"}>
			<Avatar />
			<Stack>
				<Typography fontWeight={650}>{content}</Typography>
				<Typography>{Math.floor(diff / 1000 / 60)} minutes ago</Typography>
			</Stack>
		</Stack>
	);
};

export default memo(OtherTasks);
