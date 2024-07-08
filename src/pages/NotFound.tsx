import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			height={"100vh"}
			width={"100vw"}
		>
			<Container
				maxWidth="xs"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					alignItems: "center",
				}}
			>
				<Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
					<ErrorIcon sx={{ height: "5rem", width: "5rem" }} />
					<Typography variant="h5">Page Not Found</Typography>
				</Stack>
				<Button
					variant="contained"
					color="error"
					sx={{ padding: "1rem", width: "70%", margin: "auto" }}
					onClick={() => {
						navigate("/");
					}}
				>
					Head Back To Home
				</Button>
			</Container>
		</Box>
	);
};

export default NotFound;
