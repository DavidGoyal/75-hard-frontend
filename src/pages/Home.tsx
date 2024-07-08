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
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Upload from "../components/Upload";
import toast from "react-hot-toast";
import {
	useGetProgressQuery,
	useResetProgressMutation,
} from "../redux/api/api";
import { useState } from "react";
import img1 from "../assets/Screenshot 2024-07-06 151914.png";
import img2 from "../assets/Screenshot 2024-07-06 151902.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setOpen } from "../redux/reducers/miscReducer";
import CancelIcon from "@mui/icons-material/Cancel";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data, isLoading, isError } = useGetProgressQuery();
	const [reset] = useResetProgressMutation();
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);
	const { isOpen } = useSelector((state: RootState) => state.misc);

	if (isError) {
		return toast.error("Cannot Fetch Progress");
	}

	const resetHandler = async () => {
		setButtonLoading(true);
		const id = toast.loading("Resetting...");
		try {
			const res = await reset();

			if (res.data?.success) {
				toast.success(res.data?.message, { id });
			} else {
				toast.error(res.data?.message as string, { id });
			}
		} catch (error) {
			toast.error("Cannot Reset", { id });
		}
		setButtonLoading(false);
	};

	return (
		<>
			<Header />
			<Grid container height={"calc(100vh - 4rem)"}>
				<Grid item xs={12} sm={7} sx={{ height: "100%" }}>
					<Upload />
				</Grid>

				<Grid
					item
					xs={0}
					sm={5}
					bgcolor={"whitesmoke"}
					sx={{ height: "100%", display: { xs: "none", sm: "block" } }}
				>
					<SideBar />
				</Grid>

				{!isLoading && (
					<Dialog open={(data?.days as number) >= 75}>
						<Stack p={"1rem"} width={"20rem"} spacing={"2rem"}>
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
						width: { xs: "95%", xm: "50%" },
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
							direction={{ xs: "column", xl: "row" }}
							alignItems={"center"}
							spacing={"2rem"}
							padding={"2rem"}
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
										Upload Your Image Daily
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
										2
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
						</Stack>
					</Stack>
				</Dialog>
			</Grid>
		</>
	);
};

export default Home;
