import PlusIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import PieChartIcon from "@mui/icons-material/PieChart";
import {
	Button,
	Drawer,
	IconButton,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
	useCompleteTaskQuery,
	useGetTasksQuery,
	useTodayProgressQuery,
	useUpdateTaskMutation,
} from "../redux/api/api";
import {
	setMobileOpen,
	setTaskDialogOpen,
} from "../redux/reducers/miscReducer";
import { RootState } from "../redux/store";
import { TaskType } from "../types/types";
import Header from "./Header";

const TaskPage = () => {
	const { isMobileOpen } = useSelector((state: RootState) => state.misc);
	const dispatch = useDispatch();

	const [rows, setRows] = useState<TaskType[]>([]);

	const {
		data: Complete,
		isLoading: CompleteLoading,
		isError: CompleteError,
	} = useCompleteTaskQuery();
	const {
		data: todayProgress,
		isError: todayProgressError,
		isLoading: todayProgressLoading,
	} = useTodayProgressQuery();
	const {
		data: myTasks,
		isLoading: myTasksLoading,
		isError: myTasksError,
	} = useGetTasksQuery();

	const [updateTask] = useUpdateTaskMutation();

	useEffect(() => {
		if (myTasks && myTasks.tasks) {
			setRows(
				myTasks.tasks.map((task) => {
					return {
						id: task._id,
						_id: task._id,
						content: task.content,
						completed: task.completed,
						user: task.user,
						createdAt: task.createdAt,
						updatedAt: task.updatedAt,
					};
				})
			);
		}
	}, [myTasks]);

	if (CompleteError) {
		return toast.error("Something went wrong");
	}

	if (todayProgressError) {
		return toast.error("Something went wrong");
	}

	if (myTasksError) {
		return toast.error("Something went wrong");
	}

	const completeTasks = todayProgress?.success
		? 5
		: (Complete?.tasks as number);

	const columns = [
		{ field: "id", headerName: "ID", width: 200 },
		{
			field: "content",
			headerName: "Content",
			width: 500,
		},
		{
			field: "completed",
			headerName: "Completed",
			width: 150,
			renderCell: (params) => {
				const onClick = async () => {
					try {
						await updateTask({ id: params.row.id });

						toast.success("Task updated successfully");
					} catch (error) {
						toast.error("Something went wrong");
					}
				};
				return (
					<input
						type="checkbox"
						checked={params.row.completed}
						onChange={onClick}
					/>
				);
			},
		},
	];

	return (
		<Stack height={"100%"} width={"100%"} padding={"2rem"} gap={"4rem"}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				width={"100%"}
				justifyContent={"space-between"}
				gap={"1rem"}
				position={"relative"}
			>
				<IconButton
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						display: { xs: "block", lg: "none" },
						transform: "translateY(-30px) translateX(-25px)",
					}}
					onClick={() => {
						dispatch(setMobileOpen(true));
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography fontWeight={680} fontSize={"1.4rem"} textAlign={"center"}>
					Task Management
				</Typography>
				{todayProgressLoading ? (
					<Skeleton />
				) : (
					<Button
						sx={{
							gap: "1rem",
							bgcolor: "white",
							borderRadius: "5px",
							padding: "1rem",
						}}
						disabled={todayProgress?.success}
						onClick={() => {
							dispatch(setTaskDialogOpen(true));
						}}
					>
						{todayProgress?.success ? (
							<Typography textTransform={"initial"}>
								Already completed today&apos;s tasks
							</Typography>
						) : (
							<>
								<Typography color={"#3C7348"} textTransform={"initial"}>
									Add New Task
								</Typography>
								<PlusIcon
									sx={{
										bgcolor: "#3C7348",
										color: "white",
										borderRadius: "100%",
									}}
								/>
							</>
						)}
					</Button>
				)}
			</Stack>

			<Stack
				width={"100%"}
				height={"70%"}
				direction={{ xs: "column", lg: "row" }}
				gap={"2rem"}
			>
				<Stack width={{ xs: "100%", lg: "75%" }} height={"100%"} gap={"2rem"}>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						width={"100%"}
						justifyContent={"space-between"}
						gap={"1rem"}
					>
						<Stack
							direction={"row"}
							bgcolor={"white"}
							width={{ xs: "100%", sm: "30%" }}
							padding={"1rem"}
							gap={"1rem"}
							borderRadius={"5px"}
						>
							<ListAltIcon
								sx={{
									color: "white",
									bgcolor: "skyblue",
									borderRadius: "100%",
									height: "100%",
									width: "20%",
								}}
							/>
							<Stack>
								<Typography color={"skyblue"}>5</Typography>
								<Typography>Total Tasks</Typography>
							</Stack>
						</Stack>

						<Stack
							direction={"row"}
							bgcolor={"white"}
							width={{ xs: "100%", sm: "30%" }}
							padding={"1rem"}
							gap={"1rem"}
							borderRadius={"5px"}
						>
							<EditIcon
								sx={{
									color: "white",
									bgcolor: "skyblue",
									borderRadius: "100%",
									height: "100%",
									width: "20%",
								}}
							/>
							{CompleteLoading ? (
								<Skeleton />
							) : (
								<Stack>
									<Typography color={"skyblue"}>{5 - completeTasks}</Typography>
									<Typography>Incomplete</Typography>
								</Stack>
							)}
						</Stack>
					</Stack>

					{myTasksLoading ? (
						<Skeleton />
					) : (
						<DataGrid
							rows={rows}
							columns={columns}
							disableRowSelectionOnClick
							disableColumnSorting
						/>
					)}
				</Stack>
				{CompleteLoading ? (
					<Skeleton sx={{ height: "100%", width: { xs: "100%", md: "25%" } }} />
				) : (
					<Stack
						bgcolor={"white"}
						height={"100%"}
						width={{ xs: "100%", md: "25%" }}
						padding={"1rem"}
						gap={"1rem"}
						alignSelf={"center"}
					>
						<Typography display={"flex"} alignItems={"center"}>
							<PieChartIcon />
							Task Statistics
						</Typography>

						<Stack width={"100%"} height={"70%"}>
							<PieChart
								series={[
									{
										data: [
											{ id: 0, value: completeTasks, color: "#3C7348" },
											{
												id: 1,
												value: Number(`${5 - completeTasks}`),
												color: "red",
											},
										],
									},
								]}
								sx={{
									height: "100%",
									width: "100%",
									alignSelf: "center",
									transform: "translateX(18%)",
								}}
							/>
						</Stack>

						<Stack gap={"1rem"}>
							<Stack direction={"row"} justifyContent={"space-between"}>
								<Typography>Completed</Typography>
								<Typography color={"#3C7348"}>{completeTasks}</Typography>
							</Stack>
							<Stack direction={"row"} justifyContent={"space-between"}>
								<Typography>Incomplete</Typography>
								<Typography color={"red"}>{5 - completeTasks}</Typography>
							</Stack>
						</Stack>
					</Stack>
				)}
			</Stack>
			<Drawer
				open={isMobileOpen}
				sx={{ display: { lg: "none", md: "block" } }}
				onClose={() => dispatch(setMobileOpen(false))}
			>
				<Header />
			</Drawer>
		</Stack>
	);
};

export default TaskPage;
