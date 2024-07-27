import {
	Box,
	Button,
	Drawer,
	Grid,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Paper,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useGetPhotosQuery } from "../redux/api/api";
import { PhotoType } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setMobileOpen } from "../redux/reducers/miscReducer";
import MenuIcon from "@mui/icons-material/Menu";

const Gallery = () => {
	const { isMobileOpen } = useSelector((state: RootState) => state.misc);
	const dispatch = useDispatch();

	const [photos, setPhotos] = useState<PhotoType[]>([]);
	const navigate = useNavigate();

	const { data, isLoading, isError } = useGetPhotosQuery();

	useEffect(() => {
		if (data?.success) {
			setPhotos(data?.photos);
		}
	}, [data]);

	if (isError) {
		return toast.error("Error fetching photos");
	}

	return (
		<Grid container height={"100vh"}>
			<Grid
				item
				xs={0}
				lg={2}
				sx={{ height: "100%", display: { xs: "none", lg: "block" } }}
			>
				<Header />
			</Grid>
			<Drawer
				open={isMobileOpen}
				sx={{ display: { lg: "none", md: "block" } }}
				onClose={() => dispatch(setMobileOpen(false))}
			>
				<Header />
			</Drawer>

			<Grid item xs={12} lg={10} sx={{ height: "100%" }} bgcolor={"whitesmoke"}>
				<Box
					height={"100vh"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					padding={"1rem"}
					position={"relative"}
				>
					<IconButton
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							display: { xs: "block", lg: "none" },
						}}
						onClick={() => {
							dispatch(setMobileOpen(true));
						}}
					>
						<MenuIcon />
					</IconButton>
					<Paper
						elevation={3}
						sx={{
							height: { xs: "90%", lg: "70%" },
							width: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
							borderRadius: "10px",
							padding: { xs: "0.5rem", lg: "1rem" },
							overflow: "hidden",
						}}
					>
						<Typography
							variant="h5"
							textAlign={"center"}
							fontWeight={700}
							padding={"1rem"}
							borderBottom={"1px solid black"}
						>
							GALLERY
						</Typography>

						{isLoading ? (
							<Skeleton height={"100%"} width={"100%"} />
						) : photos!.length > 0 ? (
							<ImageList
								sx={{ width: "100%", height: "90%", overflowY: "auto" }}
								cols={1}
								rowHeight={"auto"}
							>
								{photos!.map((item, index) => (
									<ImageListItem key={index}>
										<img
											srcSet={`${item.image.url}?w=164&h=170&fit=crop&auto=format&dpr=2 2x`}
											src={`${item.image.url}?w=164&h=170&fit=crop&auto=format`}
											alt={"Gallery Images"}
											loading="lazy"
										/>
										<ImageListItemBar
											title={`Day ${index + 1}`}
											position="bottom"
										/>
									</ImageListItem>
								))}
							</ImageList>
						) : (
							<Stack
								alignItems={"center"}
								justifyContent={"center"}
								height={"90%"}
								spacing={"1rem"}
							>
								<Typography
									variant="h6"
									textAlign={"center"}
									fontFamily={"monospace"}
								>
									You haven't started your journey yet.
								</Typography>
								<Button
									variant="contained"
									sx={{ padding: "1rem", bgcolor: "tomato" }}
									onClick={() => navigate("/")}
								>
									Start Your Journey Now
								</Button>
							</Stack>
						)}
					</Paper>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Gallery;
