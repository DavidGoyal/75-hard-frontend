import { useFileHandler } from "6pp";
import {
	Avatar,
	Button,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import img3 from "../assets/Classroom-Quotes-50-800x800.jpg";
import img2 from "../assets/images.png";
import img1 from "../assets/self-discipline-quotes-rohn.png";
import {
	useTodayProgressQuery,
	useUpdateProgressMutation,
} from "../redux/api/api";
import { VisuallyHiddenInput } from "./styles/StyledComponents";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const Upload = () => {
	const photo = useFileHandler("single");
	const { data, isLoading, isError } = useTodayProgressQuery();
	const [uploadFile] = useUpdateProgressMutation();
	const [buttonDisable, setButtonDisable] = useState<boolean>(false);

	if (isError) {
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

			if (res.data?.success) {
				toast.success(
					(res.data?.message as string) || "File uploaded successfully",
					{ id }
				);
			} else {
				toast.error(res.data?.message as string, { id });
			}
		} catch (error) {
			toast.error("Something went wrong", { id });
		}
		photo.clear();
		setButtonDisable(false);
	};

	return (
		<Stack
			height={"calc(100vh - 4rem)"}
			alignItems={"center"}
			spacing={"1rem"}
			padding={"2rem"}
			justifyContent={"space-evenly"}
			sx={{ overflowY: "auto" }}
		>
			<Stack
				direction={{ sm: "column", md: "row" }}
				width={"100%"}
				justifyContent={"space-between"}
				alignItems={{ sm: "center", md: "flex-start" }}
			>
				<Paper
					sx={{
						width: { sm: "40%", md: "60%", xl: "30%" },
						borderRadius: "10px",
						height: { md: "80%", xl: "50%" },
						padding: "1rem",
						display: { xs: "none", md: "block" },
					}}
					elevation={10}
				>
					<img
						src={img1}
						style={{ height: "100%", width: "100%", objectFit: "cover" }}
					/>
				</Paper>
				<Paper
					sx={{
						width: { sm: "40%", md: "40%", xl: "30%" },
						height: { md: "70%", xl: "50%" },
						borderRadius: "10px",
						padding: "1rem",
						display: { xs: "none", xl: "block" },
					}}
					elevation={10}
				>
					<img
						src={img2}
						style={{ height: "100%", width: "100%", objectFit: "contain" }}
					/>
				</Paper>
				<Paper
					sx={{
						width: { xs: "65%", sm: "60%", md: "60%", xl: "30%" },
						borderRadius: "10px",
						height: { xs: "70%", sm: "90%", md: "80%", xl: "50%" },
						padding: "1rem",
						color: "white",
						alignSelf: { xs: "center", sm: "inherit" },
					}}
					elevation={10}
				>
					<img
						src={img3}
						style={{ height: "100%", width: "100%", objectFit: "cover" }}
					/>
				</Paper>
			</Stack>
			<Stack width={"100%"} alignItems={"center"} spacing={"1rem"}>
				<Stack position={"relative"}>
					<Avatar
						sx={{ height: "15rem", width: "15rem", objectFit: "contain" }}
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
							<VisuallyHiddenInput type="file" onChange={photo.changeHandler} />
						</>
					</IconButton>
				</Stack>
				<Button
					variant="contained"
					color="error"
					sx={{ marginBottom: "1rem" }}
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
	);
};

export default Upload;
