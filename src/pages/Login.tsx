import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
	Avatar,
	Button,
	Container,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents.tsx";
import { useLoginMutation, useRegisterMutation } from "../redux/api/api.ts";
import { userExists, userNotExists } from "../redux/reducers/userReducer.ts";
import { updateProgress } from "../types/api-types.ts";

const Login = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();

	const dispatch = useDispatch();

	const name = useInputValidation("");
	const email = useInputValidation("");
	const password = useStrongPassword();
	const avatar = useFileHandler("single");

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const id = toast.loading("Signing In");

		try {
			const res = await login({
				email: email.value,
				password: password.value,
			});

			if ("data" in res) {
				toast.success(res.data!.message, { id });
				dispatch(userExists(res.data!.user));
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = error.data as updateProgress;
				toast.error(message.message || "Something Went Wrong", { id });
				dispatch(userNotExists());
			}
		} catch (error) {
			toast.error("Something went wrong!", {
				id,
			});
			dispatch(userNotExists());
		}
		setIsLoading(false);
		email.clear();
		password.clear();
	};

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const myForm = new FormData();
		myForm.set("name", name.value);
		myForm.set("email", email.value);
		myForm.set("password", password.value);
		myForm.set("photo", avatar.file!);

		const id = toast.loading("Registering");

		try {
			const res = await register({ formData: myForm });

			if ("data" in res) {
				toast.success(res.data!.message, { id });
				dispatch(userExists(res.data!.user));
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = error.data as updateProgress;
				toast.error(message.message || "User already exists", { id });
				dispatch(userNotExists());
			}
		} catch (error) {
			toast.error("Sign In Fail", {
				id,
			});
			dispatch(userNotExists());
		}
		setIsLoading(false);
	};

	return (
		<Container
			component={"main"}
			maxWidth="xs"
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					padding: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{isLogin ? (
					<>
						<Typography variant="h5">Login</Typography>

						<form
							style={{ width: "100%", marginTop: "1rem" }}
							onSubmit={handleLogin}
						>
							<TextField
								required={true}
								fullWidth
								type="email"
								label="Email"
								margin="normal"
								variant="outlined"
								value={email.value}
								onChange={email.changeHandler}
							/>

							<TextField
								required={true}
								fullWidth
								label="Password"
								type="password"
								margin="normal"
								variant="outlined"
								value={password.value}
								onChange={password.changeHandler}
							/>

							<Button
								variant="contained"
								color="primary"
								type="submit"
								sx={{ marginTop: "1rem" }}
								fullWidth
								disabled={isLoading}
							>
								Login
							</Button>

							<Typography textAlign={"center"} m={"1rem"}>
								OR
							</Typography>

							<Button
								variant="text"
								fullWidth
								onClick={() => setIsLogin(false)}
								disabled={isLoading}
							>
								Sign Up Instead
							</Button>
						</form>
					</>
				) : (
					<>
						<Typography variant="h5">Sign Up</Typography>

						<form
							style={{ width: "100%", marginTop: "1rem" }}
							onSubmit={handleRegister}
						>
							<Stack position={"relative"} width={"10rem"} margin={"auto"}>
								<Avatar
									sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
									src={avatar.preview!}
								/>
								<IconButton
									sx={{
										position: "absolute",
										bottom: "0",
										right: "0",
										color: "white",
										bgcolor: "rgba(0,0,0,0.5)",
										":hover": {
											bgColor: "rgba(0,0,0,0.7)",
										},
									}}
									component="label"
								>
									<>
										<CameraAltIcon />
										<VisuallyHiddenInput
											type="file"
											onChange={avatar.changeHandler}
										/>
									</>
								</IconButton>
							</Stack>

							{avatar.error && (
								<Typography
									width="fit-content"
									m={"1rem auto"}
									display={"block"}
									color={"error"}
									variant="caption"
								>
									{avatar.error}
								</Typography>
							)}

							<TextField
								required={true}
								fullWidth
								label="Name"
								margin="normal"
								variant="outlined"
								value={name.value}
								onChange={name.changeHandler}
							/>

							<TextField
								required={true}
								fullWidth
								label="Email"
								type="email"
								margin="normal"
								variant="outlined"
								value={email.value}
								onChange={email.changeHandler}
							/>

							{email.error && (
								<Typography color={"error"} variant="caption">
									{email.error}
								</Typography>
							)}

							<TextField
								required={true}
								fullWidth
								label="Password"
								type="password"
								margin="normal"
								variant="outlined"
								value={password.value}
								onChange={password.changeHandler}
							/>

							{password.error && (
								<Typography color={"error"} variant="caption">
									{password.error}
								</Typography>
							)}

							<Button
								variant="contained"
								color="primary"
								type="submit"
								sx={{ marginTop: "1rem" }}
								fullWidth
								disabled={isLoading}
							>
								Sign Up
							</Button>

							<Typography textAlign={"center"} m={"1rem"}>
								OR
							</Typography>

							<Button
								variant="text"
								fullWidth
								onClick={() => setIsLogin(true)}
								disabled={isLoading}
							>
								Login Instead
							</Button>
						</form>
					</>
				)}
			</Paper>
		</Container>
	);
};

export default Login;
