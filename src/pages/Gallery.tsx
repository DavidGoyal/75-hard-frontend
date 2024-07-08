import {
	Box,
	Button,
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

const Gallery = () => {
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
		<>
			<Header />
			<Box
				height={"calc(100vh - 4rem)"}
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Paper
					elevation={3}
					sx={{
						height: { xs: "40%", lg: "70%" },
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
						fontFamily={"cursive"}
						padding={"1rem"}
						borderBottom={"1px solid black"}
					>
						GALLERY
					</Typography>

					{isLoading ? (
						<Skeleton height={"90%"} width={"100%"} />
					) : photos!.length > 0 ? (
						<ImageList
							sx={{ width: "100%", height: "90%", overflowY: "auto" }}
							cols={3}
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
		</>
	);
};

export default Gallery;
