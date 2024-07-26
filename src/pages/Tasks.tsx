import {
	Button,
	Dialog,
	DialogTitle,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Header from "../components/Header";
import TaskPage from "../components/TaskPage";
import { useState } from "react";
import { run } from "../actions/suggestMessages";
import { useGetProgressQuery, useNewTaskMutation } from "../redux/api/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTaskDialogOpen } from "../redux/reducers/miscReducer";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { updateProgress } from "../types/api-types";
import { Navigate } from "react-router-dom";

const initialTasks = [
	"Do 30 pushups.",
	"Wake up early in the morning.",
	"Read a page of the book.",
];

const Tasks = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState(initialTasks);
	const [taskLoading, setTaskLoading] = useState(false);
	const [taskAdding, setTaskAdding] = useState(false);

	const [addTask] = useNewTaskMutation();

	const dispatch = useDispatch();
	const { isTaskDialogOpen } = useSelector((state: RootState) => state.misc);

	const { data, isError } = useGetProgressQuery();

	if (isError) {
		toast.error("Cannot Fetch Progress");
	}

	const suggestMessages = async () => {
		setTaskLoading(true);
		try {
			const output = await run();
			const newTasks = output.split("||");
			setTasks(newTasks);
		} catch (error) {
			console.log(error);
			toast.error("Cannot suggest messages, try again later");
		} finally {
			setTaskLoading(false);
		}
	};

	const addTasks = async () => {
		setTaskAdding(true);
		const id = toast.loading("Adding Task");

		try {
			const res = await addTask({ content: task });

			if ("data" in res) {
				toast.success(
					(res.data?.message as string) || "Task added successfully",
					{ id }
				);
				dispatch(setTaskDialogOpen(false));
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = error.data as updateProgress;
				toast.error(message.message, { id });
			}
		} catch (error) {
			toast.error("Something went wrong", { id });
		} finally {
			setTaskAdding(false);
		}
	};

	if (data && data?.days >= 75) {
		return <Navigate to={"/dashboard"} />;
	}

	return (
		<>
			<Grid container height={{ sm: "170vh", lg: "100vh" }}>
				<Grid
					item
					xs={0}
					lg={2}
					sx={{ height: "100%", display: { xs: "none", lg: "block" } }}
				>
					<Header />
				</Grid>
				<Grid
					item
					xs={12}
					lg={10}
					sx={{ height: "100%" }}
					bgcolor={"whitesmoke"}
				>
					<TaskPage />
				</Grid>
			</Grid>

			<Dialog
				open={isTaskDialogOpen}
				onClose={() => dispatch(setTaskDialogOpen(false))}
			>
				<Stack
					p={"1rem"}
					height={"85vh"}
					gap={"2rem"}
					width={{ xs: "80vw", sm: "60vw", md: "45vw", lg: "35vw" }}
				>
					<DialogTitle textAlign={"center"} fontWeight={"700"}>
						Add New Task
					</DialogTitle>
					<Stack alignItems={"center"} spacing={"1rem"} width={"100%"}>
						<TextField
							type="text"
							sx={{ flexGrow: 1 }}
							value={task}
							onChange={(e) => setTask(e.target.value)}
							placeholder="Write your task here"
							fullWidth
						/>

						<Button
							sx={{
								bgcolor: "black",
								color: "white",
								borderRadius: "5px",
								padding: "0.5rem",
								":hover": { bgcolor: "grey", color: "white" },
								":disabled": { bgcolor: "grey", color: "white" },
							}}
							disabled={taskLoading || taskAdding}
							onClick={() => addTasks()}
						>
							Add Task
						</Button>
					</Stack>

					<Stack
						alignSelf={"flex-start"}
						width={"100%"}
						mt={"2rem"}
						gap={"1rem"}
					>
						<Button
							sx={{
								bgcolor: "black",
								color: "white",
								width: "32%",
								textAlign: "center",
								":hover": { bgcolor: "grey", color: "white" },
								":disabled": { bgcolor: "grey", color: "white" },
							}}
							onClick={() => suggestMessages()}
							disabled={taskLoading}
						>
							Suggest Tasks
						</Button>
						<Typography>Click on any task below to select it.</Typography>
						<Stack
							border={"1px solid black"}
							width={"100%"}
							padding={"1rem"}
							borderRadius={"5px"}
							gap={"1rem"}
						>
							<Typography fontWeight={600}>Suggested Tasks</Typography>
							{tasks.map((task, index) => (
								<Button
									id={String(index)}
									sx={{
										bgcolor: "white",
										borderRadius: "5px",
										padding: "0.5rem",
										width: "100%",
										color: "black",
										border: "1px solid black",
										fontWeight: 600,
										textTransform: "initial",
									}}
									onClick={() => setTask(task)}
								>
									{task}
								</Button>
							))}
						</Stack>
					</Stack>
				</Stack>
			</Dialog>
		</>
	);
};

export default Tasks;
