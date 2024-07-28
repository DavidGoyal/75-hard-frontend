import CollectionsIcon from "@mui/icons-material/Collections";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Skeleton, Stack, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import img1 from "../assets/0_1h_h2z9FDTghFT-P.jpg";
import { server } from "../constants/config";
import { useGetProgressQuery, useTodayProgressQuery } from "../redux/api/api";
import { setMobileOpen } from "../redux/reducers/miscReducer";
import { userNotExists } from "../redux/reducers/userReducer";

const Header = () => {
	const dispatch = useDispatch();

	const { data, isLoading, isError } = useTodayProgressQuery();
	const { data: progress, isLoading: progressLoading } = useGetProgressQuery();

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

	if (isError) {
		toast.error("Something went wrong");
	}

	return (
		<Stack
			padding={"1.2rem"}
			gap={"8%"}
			height={"100%"}
			width={"100%"}
			position={"relative"}
		>
			<Stack direction={"row"} alignItems={"center"} gap={"0.5rem"}>
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

			{isLoading || progressLoading ? (
				<Skeleton sx={{ padding: "1rem" }} />
			) : (
				<Stack
					direction={"row"}
					bgcolor={"whitesmoke"}
					padding={"1rem"}
					justifyContent={"space-between"}
					borderRadius={"7px"}
				>
					<Typography>My Streak</Typography>
					<Stack
						sx={{ p: 0, ml: { xs: "0.2rem", sm: "1rem" } }}
						direction={"row"}
					>
						<WhatshotIcon sx={{ color: data!.success ? "red" : "black" }} />
						<Typography>{progress?.days}</Typography>
					</Stack>
				</Stack>
			)}

			<Stack gap={"2rem"}>
				<Link
					to={"/"}
					style={{ textDecoration: "none" }}
					onClick={() => dispatch(setMobileOpen(false))}
				>
					<Stack direction={"row"} alignItems={"center"} gap={0.8}>
						<HomeIcon
							sx={{
								color: window.location.pathname === "/" ? "#01796F" : "grey",
							}}
						/>
						<Typography
							color={window.location.pathname === "/" ? "#01796F" : "grey"}
						>
							Home
						</Typography>
					</Stack>
				</Link>

				<Link
					to={"/dashboard"}
					style={{ textDecoration: "none" }}
					onClick={() => dispatch(setMobileOpen(false))}
				>
					<Stack direction={"row"} alignItems={"center"} gap={0.8}>
						<DashboardIcon
							sx={{
								color:
									window.location.pathname === "/dashboard"
										? "#01796F"
										: "grey",
							}}
						/>
						<Typography
							color={
								window.location.pathname === "/dashboard" ? "#01796F" : "grey"
							}
						>
							Dashboard
						</Typography>
					</Stack>
				</Link>

				<Link
					to={"/tasks"}
					style={{ textDecoration: "none" }}
					onClick={() => dispatch(setMobileOpen(false))}
				>
					<Stack direction={"row"} alignItems={"center"} gap={0.8}>
						<ListAltIcon
							sx={{
								color:
									window.location.pathname === "/tasks" ? "#01796F" : "grey",
							}}
						/>
						<Typography
							color={window.location.pathname === "/tasks" ? "#01796F" : "grey"}
						>
							Tasks
						</Typography>
					</Stack>
				</Link>

				<Link
					to={"/gallery"}
					style={{ textDecoration: "none" }}
					onClick={() => dispatch(setMobileOpen(false))}
				>
					<Stack direction={"row"} alignItems={"center"} gap={0.8}>
						<CollectionsIcon
							sx={{
								color:
									window.location.pathname === "/gallery" ? "#01796F" : "grey",
							}}
						/>
						<Typography
							color={
								window.location.pathname === "/gallery" ? "#01796F" : "grey"
							}
						>
							Gallery
						</Typography>
					</Stack>
				</Link>
			</Stack>

			<button
				onClick={() => {
					logoutHandler();
					dispatch(setMobileOpen(false));
				}}
				style={{
					border: "none",
					outline: "none",
					backgroundColor: "white",
					position: "absolute",
					cursor: "pointer",
					bottom: "1rem",
				}}
			>
				<Stack direction={"row"} alignItems={"center"} gap={0.8}>
					<LogoutIcon sx={{ color: "grey" }} />
					<Typography color={"grey"}>Log out</Typography>
				</Stack>
			</button>
		</Stack>
	);
};

export default Header;
