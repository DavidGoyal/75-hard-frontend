import { useFileHandler } from "6pp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MenuIcon from "@mui/icons-material/Menu";
import {
	Avatar,
	Button,
	Drawer,
	IconButton,
	Paper,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import img2 from "../assets/Classroom-Quotes-50-800x800.jpg";
import img1 from "../assets/png-transparent-task-list-thumbnail.png";
import {
	useCompleteTaskQuery,
	useTodayProgressQuery,
	useUpdateProgressMutation,
} from "../redux/api/api";
import { setMobileOpen } from "../redux/reducers/miscReducer";
import { RootState } from "../redux/store";
import { updateProgress } from "../types/api-types";
import Header from "./Header";
import Progress from "./Progress";
import { VisuallyHiddenInput } from "./styles/StyledComponents";
import { Link } from "react-router-dom";

const Upload = () => {
	const photo = useFileHandler("single");
	const { data, isLoading, isError } = useTodayProgressQuery();
	const {
		data: completeTasks,
		isLoading: completeTasksLoading,
		isError: completeTasksError,
	} = useCompleteTaskQuery();
	const [uploadFile] = useUpdateProgressMutation();
	const [buttonDisable, setButtonDisable] = useState<boolean>(false);

	const { user } = useSelector((state: RootState) => state.user);
	const { isMobileOpen } = useSelector((state: RootState) => state.misc);

	const dispatch = useDispatch();

	const date = new Date(Date.now());
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	if (isError) {
		return toast.error("Something went wrong");
	}

	if (completeTasksError) {
		return toast.error("Something went wrong");
	}

	const submitHandler = async () => {
		if (!photo.file) {
			return toast.error("Please select a file");
		}
		const formData = new FormData();
		formData.set("photo", photo.file);

		const id = toast.loading("Uploading Image");
		setButtonDisable(true);

		try {
			const res = await uploadFile({ formData });

			if ("data" in res) {
				toast.success(
					(res.data?.message as string) || "File uploaded successfully",
					{ id }
				);
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = error.data as updateProgress;
				toast.error(message.message, { id });
			}
		} catch (error) {
			toast.error("Something went wrong", { id });
		}
		photo.clear();
		setButtonDisable(false);
	};

	return (
		<Stack
			height={"100vh"}
			width={"100%"}
			alignItems={"center"}
			spacing={"2rem"}
			padding={"2rem"}
			sx={{ overflowY: "auto" }}
			position={"relative"}
		>
			<Stack
				direction={"row"}
				width={"100%"}
				justifyContent={"space-between"}
				alignItems={"center"}
				position={"relative"}
			>
				<IconButton
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						display: { xs: "block", lg: "none" },
						transform: "translateY(-5px) translateX(-35px)",
					}}
					onClick={() => {
						dispatch(setMobileOpen(true));
					}}
				>
					<MenuIcon />
				</IconButton>
				<Stack ml={"0.5rem"}>
					<Typography fontWeight={680} fontSize={"1.4rem"}>
						Dashboard
					</Typography>
					<Typography>
						{`${weekday[date.getDay()]}, ${date.getDate()}`}{" "}
						{month[date.getMonth()]} {date.getFullYear()}
					</Typography>
				</Stack>
				<Avatar src={user?.avatar.url} />
			</Stack>

			<Stack
				direction={{ xs: "column", sm: "row" }}
				width={"100%"}
				height={{ xs: "40%", sm: "20%" }}
				bgcolor={"white"}
				borderRadius={"5px"}
				padding={"2rem"}
				gap={"1.5rem"}
				alignItems={"center"}
			>
				<Stack height={{ xs: "40%", sm: "100%" }}>
					<img src={img1} alt="Task" style={{ height: "100%" }} />
				</Stack>
				<Stack flexGrow={1}>
					<Typography
						color={"#3C7348"}
						textAlign={{ xs: "center", sm: "inherit" }}
					>
						Hi, <b>{user?.name}</b>
					</Typography>
					<Typography textAlign={{ xs: "center", sm: "inherit" }}>
						Let&apos;s finish your task today!
					</Typography>
				</Stack>
				{completeTasksLoading ? (
					<Skeleton />
				) : (
					<Link to={"/tasks"} style={{ textDecoration: "none" }}>
						<Typography color={"initial"}>
							<b style={{ color: "#3C7348" }}>{`${
								data?.success ? "No" : 5 - (completeTasks?.tasks as number)
							} Task`}</b>{" "}
							waiting
						</Typography>
					</Link>
				)}
			</Stack>

			<Stack
				direction={"row"}
				height={"42%"}
				width={"100%"}
				justifyContent={{ xs: "center", sm: "space-between" }}
			>
				<Progress />

				<Paper
					elevation={10}
					sx={{
						height: "100%",
						width: "50%",
						display: { xs: "none", sm: "block" },
						borderRadius: "10px",
					}}
				>
					<img
						src={img2}
						style={{ height: "100%", width: "100%", objectFit: "contain" }}
					/>
				</Paper>
			</Stack>

			<Stack width={"100%"} spacing={"1rem"}>
				<Typography
					alignSelf={"flex-start"}
					fontWeight={650}
					fontSize={"1.2rem"}
				>
					Upload Daily Selfie
				</Typography>
				<Stack
					width={"100%"}
					bgcolor={"white"}
					padding={"1rem"}
					alignItems={"center"}
				>
					<Stack width={{ xs: "70%", sm: "30%" }} gap={"2px"}>
						<Stack position={"relative"} margin={"auto"}>
							<Avatar
								sx={{ height: "10rem", width: "10rem", objectFit: "contain" }}
								src={photo.preview!}
							/>
							<IconButton
								sx={{
									position: "absolute",
									bottom: "0",
									right: "0",
									color: "white",
									bgcolor: "rgba(0,0,0,0.5)",
									":hover": {
										bgColor: "rgba(0,0,0,0.5)",
									},
								}}
								component="label"
							>
								<>
									<CameraAltIcon />
									<VisuallyHiddenInput
										type="file"
										onChange={photo.changeHandler}
									/>
								</>
							</IconButton>
						</Stack>
						<Button
							variant="contained"
							color="error"
							sx={{ marginBottom: "1rem", width: "100%" }}
							disabled={isLoading || data?.success || buttonDisable}
							onClick={submitHandler}
						>
							{data?.success
								? "Already Uploaded Today's Photo"
								: "Upload Your Today's Photo"}
						</Button>

						{photo.error && (
							<Typography
								width="fit-content"
								m={"1rem auto"}
								display={"block"}
								color={"error"}
								variant="caption"
							>
								{photo.error}
							</Typography>
						)}
					</Stack>
				</Stack>
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

export default Upload;
