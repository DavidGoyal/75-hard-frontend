import CancelIcon from "@mui/icons-material/Cancel";
import HelpIcon from "@mui/icons-material/Help";
import {
	Button,
	Dialog,
	DialogTitle,
	Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import img4 from "../assets/Screenshot 2024-07-06 151902.png";
import img3 from "../assets/Screenshot 2024-07-06 151914.png";
import img1 from "../assets/Screenshot 2024-07-26 134449.png";
import img2 from "../assets/Screenshot 2024-07-26 195711.png";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Upload from "../components/Upload";
import {
	useGetProgressQuery,
	useResetProgressMutation,
} from "../redux/api/api";
import { setOpen } from "../redux/reducers/miscReducer";
import { RootState } from "../redux/store";
import { updateProgress } from "../types/api-types";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data, isLoading } = useGetProgressQuery();
	const [reset] = useResetProgressMutation();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const { isOpen } = useSelector((state: RootState) => state.misc);

	const resetHandler = async () => {
		setButtonLoading(true);
		const id = toast.loading("Resetting...");
		try {
			const res = await reset();

			if ("data" in res) {
				toast.success(res.data!.message, { id });
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = error.data as updateProgress;
				toast.error(message.message, { id });
			}
		} catch (error) {
			toast.error("Cannot Reset", { id });
		}
		setButtonLoading(false);
	};

	return (
		<>
			<Grid container height={"100vh"}>
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
					md={9}
					lg={7}
					sx={{ height: "100%", position: "relative" }}
					bgcolor={"whitesmoke"}
				>
					<Upload />

					<Button
						sx={{
							color: "black",
							position: "absolute",
							bottom: 0,
							right: 0,
							display: { xs: "block", md: "none" },
						}}
						onClick={() => dispatch(setOpen(true))}
					>
						<HelpIcon sx={{ fontSize: "2rem" }} />
					</Button>
				</Grid>

				<Grid
					item
					xs={0}
					md={3}
					sx={{
						height: "100%",
						display: { xs: "none", md: "block" },
					}}
				>
					<SideBar />
				</Grid>

				{!isLoading && (
					<Dialog open={(data?.days as number) >= 75}>
						<Stack
							p={"1rem"}
							width={{ xs: "15rem", sm: "20rem" }}
							spacing={"2rem"}
						>
							<DialogTitle textAlign={"center"}>
								🎉Congratulations you have completed your 75 days challenge.🎉
							</DialogTitle>
							<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
								<Button variant="text" onClick={() => navigate("/gallery")}>
									Click to check your memories
								</Button>
								<Button
									color="error"
									variant="outlined"
									disabled={buttonLoading}
									onClick={resetHandler}
								>
									Reset
								</Button>
							</Stack>
						</Stack>
					</Dialog>
				)}

				<Dialog
					open={isOpen}
					sx={{
						width: "100%",
						margin: "auto",
					}}
					onClose={() => dispatch(setOpen(false))}
				>
					<Stack
						width={"100%"}
						spacing={"2rem"}
						height={"100%"}
						sx={{
							overflowY: { xs: "auto", sm: "hidden" },
							position: "relative",
						}}
					>
						<DialogTitle
							textAlign={"center"}
							bgcolor={"royalblue"}
							color={"white"}
							sx={{ mx: "auto", width: "10rem" }}
							alignSelf={"center"}
							borderRadius={"0 0 6px 6px"}
						>
							Challenge Rules
						</DialogTitle>
						<IconButton
							sx={{
								position: "absolute",
								top: "0",
								right: "0",
								transform: "translate(0,-60%)",
							}}
							onClick={() => dispatch(setOpen(false))}
						>
							<CancelIcon sx={{ color: "red", height: "3rem" }} />
						</IconButton>
						<Stack
							direction={{ xs: "column", md: "row" }}
							alignItems={"center"}
							spacing={"2rem"}
							padding={"2rem"}
							sx={{ overflowX: "auto" }}
						>
							<Stack spacing={"1rem"} alignItems={"center"}>
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={"0.5rem"}
								>
									<Typography
										sx={{
											color: "white",
											bgcolor: "royalblue",
											width: "2rem",
											height: "2rem",
											borderRadius: "100%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										1
									</Typography>
									<span style={{ color: "royalblue", fontWeight: "540" }}>
										Create five tasks Daily
									</span>
								</Stack>
								<Paper
									elevation={3}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: "10px",
									}}
								>
									<img
										src={img1}
										style={{
											width: "15rem",
											height: "15rem",
											border: "1px solid white",
											objectFit: "cover",
										}}
									/>
								</Paper>
							</Stack>

							<Stack spacing={"1rem"} alignItems={"center"}>
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={"0.5rem"}
								>
									<Typography
										sx={{
											color: "white",
											bgcolor: "royalblue",
											width: "2rem",
											height: "2rem",
											borderRadius: "100%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										2
									</Typography>
									<span style={{ color: "royalblue", fontWeight: "540" }}>
										Complete all the tasks
									</span>
								</Stack>
								<Paper
									elevation={3}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: "10px",
									}}
								>
									<img
										src={img2}
										style={{
											width: "15rem",
											height: "15rem",
											border: "1px solid white",
											objectFit: "contain",
										}}
									/>
								</Paper>
							</Stack>

							<Stack spacing={"1rem"} alignItems={"center"}>
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={"0.5rem"}
								>
									<Typography
										sx={{
											color: "white",
											bgcolor: "royalblue",
											width: "2rem",
											height: "2rem",
											borderRadius: "100%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										3
									</Typography>
									<span style={{ color: "royalblue", fontWeight: "540" }}>
										Upload Your Image
									</span>
								</Stack>
								<Paper
									elevation={3}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: "10px",
									}}
								>
									<img
										src={img3}
										style={{
											width: "15rem",
											height: "15rem",
											border: "1px solid white",
											objectFit: "contain",
										}}
									/>
								</Paper>
							</Stack>

							<Stack spacing={"1rem"} alignItems={"center"}>
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={"0.5rem"}
								>
									<Typography
										sx={{
											color: "white",
											bgcolor: "royalblue",
											width: "2rem",
											height: "2rem",
											borderRadius: "100%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										4
									</Typography>
									<span style={{ color: "royalblue", fontWeight: "540" }}>
										Keep Track Of Your Progress
									</span>
								</Stack>
								<Paper
									elevation={3}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: "10px",
									}}
								>
									<img
										src={img4}
										style={{
											width: "15rem",
											height: "15rem",
											border: "1px solid white",
											objectFit: "contain",
										}}
									/>
								</Paper>
							</Stack>
						</Stack>
					</Stack>
				</Dialog>
			</Grid>
		</>
	);
};

export default Home;
