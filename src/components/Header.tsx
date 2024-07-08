import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Skeleton,
	Stack,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import axios from "axios";
import { server } from "../constants/config";
import toast from "react-hot-toast";
import { userNotExists } from "../redux/reducers/userReducer";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useGetProgressQuery, useTodayProgressQuery } from "../redux/api/api";

const Header = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const { data, isLoading, isError } = useTodayProgressQuery();
	const {
		data: progress,
		isLoading: progressLoading,
		isError: progressError,
	} = useGetProgressQuery();

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const homeHandler = () => {
		navigate("/");
	};

	const galleryHandler = () => {
		navigate("/gallery");
	};

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

	if (progressError) {
		return toast.error("Cannot Fetch Progress");
	}

	return (
		<Box height={"4rem"} flexGrow={1}>
			<AppBar sx={{ bgcolor: "tomato" }}>
				<Toolbar>
					<Typography
						variant="h5"
						flexGrow={1}
						sx={{
							fontFamily: "monospace",
							fontWeight: { xs: 500, sm: 700 },
							letterSpacing: { xs: 0, sm: ".3rem" },
						}}
					>
						SWEATFUSE
					</Typography>
					<Stack direction={"row"} gap={{ xs: "0", sm: "1rem" }}>
						<Button
							sx={{ my: 2, color: "white", display: "block" }}
							onClick={homeHandler}
						>
							HOME
						</Button>

						<Button
							sx={{ my: 2, color: "white", display: "block" }}
							onClick={galleryHandler}
						>
							GALLERY
						</Button>
					</Stack>

					{isLoading || progressLoading ? (
						<Skeleton />
					) : (
						<Tooltip title="Your Streak">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0, ml: { xs: "0.2rem", sm: "1rem" } }}
							>
								<WhatshotIcon
									sx={{ color: data!.success ? "black" : "white" }}
								/>
								<Typography>{progress?.days}</Typography>
							</IconButton>
						</Tooltip>
					)}

					<Tooltip title="Options">
						<IconButton
							onClick={handleOpenUserMenu}
							sx={{ p: 0, ml: { xs: "0.2rem", sm: "1rem" } }}
						>
							<Avatar alt={user?.name} src={user!.avatar.url} />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "45px" }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<MenuItem onClick={handleCloseUserMenu}>
							<Button onClick={logoutHandler}>Logout</Button>
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
