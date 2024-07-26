import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/0_1h_h2z9FDTghFT-P.jpg";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userNotExists } from "../redux/reducers/userReducer";
import { RootState } from "../redux/store";
import img2 from "../assets/Screenshot 2024-07-26 132553.png";
import img3 from "../assets/Screenshot 2024-07-26 133327.png";
import img4 from "../assets/Screenshot 2024-07-26 134449.png";
import video1 from "../assets/Untitled video - Made with Clipchamp (5).mp4";
import { useState } from "react";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state.user);
	const [startVideo, setStartVideo] = useState(false);

	const logoutHandler = async () => {
		try {
			const res = await axios.get(`${server}/api/v1/user/logout`, {
				withCredentials: true,
			});

			if (res.data.success) {
				toast.success(res.data.message);
				dispatch(userNotExists());
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};
	return (
		<Stack
			height={{ xs: "120vh", md: "100vh" }}
			width={"100vw"}
			bgcolor={"whitesmoke"}
			padding={"1rem"}
			gap={"2rem"}
			overflow={"hidden"}
		>
			<Stack direction={"row"} width={"100%"}>
				<Stack
					direction={"row"}
					alignItems={"center"}
					gap={"0.5rem"}
					flexGrow={1}
				>
					<img
						src={img1}
						style={{ height: "2.2rem", width: "2rem", borderRadius: "20%" }}
					/>
					<Typography
						variant="h5"
						flexGrow={1}
						sx={{
							fontWeight: { xs: 500, sm: 750 },
						}}
					>
						SWEATFUSE
					</Typography>
				</Stack>
				{user?._id ? (
					<Button
						onClick={logoutHandler}
						sx={{
							bgcolor: "white",
							color: "#01796F",
							borderRadius: "5px",
							padding: { xs: "0.5rem", lg: "0.5rem 1.5rem" },
						}}
					>
						Log Out
					</Button>
				) : (
					<Button
						sx={{
							bgcolor: "white",
							color: "#01796F",
							borderRadius: "5px",
							padding: { xs: "0.5rem", lg: "0.5rem 1.5rem" },
						}}
						onClick={() => {
							navigate("/login");
						}}
					>
						Sign Up
					</Button>
				)}
			</Stack>
			<Stack
				alignSelf={"center"}
				mt={"1rem"}
				alignItems={"center"}
				width={{ xs: "100%", md: "55%" }}
				gap={"1rem"}
			>
				<Typography variant="h1" width={"100%"} textAlign={"center"}>
					Get Better.
				</Typography>
				<Typography variant="h6" width={"100%"} textAlign={"center"}>
					SweatFuse enables you to bring discipline in your life and helps you
					to fulfill your goals.
				</Typography>
				<Stack direction={"row"} gap={"1rem"} mt={"1rem"}>
					{user?._id ? (
						<Button
							sx={{
								color: "white",
								bgcolor: "darkorange",
								borderRadius: "5px",
								padding: "0.5rem 1rem",
								":hover": { bgcolor: "orange" },
							}}
							onClick={() => {
								navigate("/dashboard");
							}}
						>
							Dashboard
						</Button>
					) : (
						<Button
							sx={{
								color: "white",
								bgcolor: "darkorange",
								borderRadius: "5px",
								padding: "0.5rem 1rem",
								":hover": { bgcolor: "orange" },
							}}
							onClick={() => {
								navigate("/login");
							}}
						>
							Get Started
						</Button>
					)}
					<Button
						sx={{
							bgcolor: "white",
							color: "#01796F",
							borderRadius: "5px",
							padding: "0.5rem 1rem",
						}}
						onClick={() => {
							setStartVideo(true);
						}}
					>
						Discover in video
					</Button>
				</Stack>
			</Stack>

			<Stack
				width={"100%"}
				height={"48%"}
				alignItems={"center"}
				mt={"1rem"}
				sx={{ position: "relative" }}
			>
				<Stack
					sx={{
						width: { xs: "100%", md: "70%" },
						height: "100%",
						borderRadius: "10px",
						zIndex: 10,
					}}
				>
					<img
						src={img2}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</Stack>
				<Stack
					sx={{
						position: "absolute",
						height: "40%",
						right: 100,
						top: 30,
						borderRadius: "5px",
						display: { xs: "none", md: "block" },
						zIndex: 10,
					}}
				>
					<img
						src={img3}
						style={{
							height: "100%",
							objectFit: "contain",
						}}
					/>
				</Stack>
				<Stack
					sx={{
						position: "absolute",
						height: "40%",
						left: 120,
						bottom: 30,
						borderRadius: "5px",
						zIndex: 10,
						display: { xs: "none", md: "block" },
					}}
				>
					<img
						src={img4}
						style={{
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</Stack>
				<Typography
					sx={{
						position: "absolute",
						height: "40%",
						width: "10%",
						left: { xs: 100, lg: 140 },
						top: 0,
						borderRadius: "100%",
						border: "1px solid darkorange",
						backgroundColor: "orange",
						transform: "translateY(-60px)",
						display: { xs: "none", md: "block" },
					}}
				/>
			</Stack>
			<Dialog open={startVideo} onClose={() => setStartVideo(false)}>
				<video controls autoPlay>
					<source src={video1} type="video/mp4" />
				</video>
			</Dialog>
		</Stack>
	);
};

export default Home;
