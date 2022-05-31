import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
	Avatar,
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
	useTheme
} from "@mui/material";

import {
	Abc as AbcIcon,
	Lock as LockIcon,
	LockOutlined as LockOutlinedIcon,
	Person as PersonIcon,
	Visibility,
	VisibilityOff
} from "@mui/icons-material";

import { UserContext } from "#Context";
import { Notification } from "#Components";

const SignUpForm = () => {
	const { user, setUser } = useContext(UserContext);
	const theme = useTheme();
	const [notif, setNotif] = useState({});

	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		showPassword: false
	});

	const notifClose = () => {
		setNotif({});
	};

	const handleChange = prop => event => {
		//console.log("Prop:", prop, "Value:", event.target.value);
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword
		});
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const handleSubmit = event => {
		event.preventDefault();
		const { username, firstName, lastName, password } = values;
		fetch(
			process.env.NODE_ENV
				? "https://bloggly-api.herokuapp.com/api/v1/register"
				: "http://localhost:8081/api/v1/register",
			{
				body: JSON.stringify({
					username,
					firstName,
					lastName,
					password
				}),
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(res => {
			if (res.ok) {
				res.json().then(data => {
					console.log({ data });
					setUser({
						...user,
						isLoggedIn: true,
						posts: [],
						info: { ...data.data }
					});
				});
			} else {
				res.json().then(data => {
					/*
					 * On error data respone will be some variation of:
					 * {
					 *  	err: "No Password",
					 *		message: "please enter a valid password"
					 * }
					 */
					/// On error data respone will be some variation of:
					/// { message: "unable to authenticate user" }
					setNotif({
						title: data.err,
						message: data.message,
						severity: "err"
					});
				});
			}
			setValues({
				...values,
				username: "",
				password: ""
			});
		});
	};
	return (
		<>
			{Object.keys(notif).length > 0 && (
				<Notification
					show
					message={notif.message}
					title={notif.title}
					severity={notif.severity}
					afterClose={notifClose}
				/>
			)}
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					borderWidth: "2px",
					borderRadius: "12px",
					padding: "3rem 2rem"
				}}
			>
				<Avatar
					sx={{
						m: 1,
						backgroundColor: theme.palette.gsb.primary,
						color: theme.palette.primary
					}}
				>
					<LockOutlinedIcon />
				</Avatar>
				<Typography
					component="h1"
					variant="h5"
					sx={{
						color:
							theme.palette.mode === "light"
								? theme.palette.hover.table
								: theme.palette.active,
						pb: "1.5rem"
					}}
				>
					Sign Up
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1, flexGrow: 1 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-password"
									sx={{
										fontSize: "1.2em",
										transition: "all 0.7s ease-out",
										"&.Mui-focused": {
											transition: "all 0.7s ease-out"
										},
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
								>
									First Name
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-firstname"
									type="text"
									value={values.firstname}
									onChange={handleChange("firstName")}
									sx={{
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
									startAdornment={
										<InputAdornment
											position="start"
											sx={{
												color: theme.palette.gsb.primary
											}}
										>
											<AbcIcon />
										</InputAdornment>
									}
									label="Firstname"
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-password"
									sx={{
										fontSize: "1.2em",
										transition: "all 0.7s ease-out",
										"&.Mui-focused": {
											transition: "all 0.7s ease-out"
										},
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
								>
									User Name
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-lastname"
									type="text"
									value={values.lastname}
									onChange={handleChange("lastName")}
									sx={{
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
									startAdornment={
										<InputAdornment
											position="start"
											sx={{
												color: theme.palette.gsb.primary
											}}
										>
											<AbcIcon />
										</InputAdornment>
									}
									label="Lastname"
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-password"
									sx={{
										fontSize: "1.2em",
										transition: "all 0.7s ease-out",
										"&.Mui-focused": {
											transition: "all 0.7s ease-out"
										},
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
								>
									User Name
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-username"
									type="text"
									value={values.username}
									onChange={handleChange("username")}
									sx={{
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
									startAdornment={
										<InputAdornment
											position="start"
											sx={{
												color: theme.palette.gsb.primary
											}}
										>
											<PersonIcon />
										</InputAdornment>
									}
									label="Username"
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth variant="outlined">
								<InputLabel
									htmlFor="outlined-adornment-password"
									sx={{
										fontSize: "1.2em",
										transition: "all 0.7s ease-out",
										"&.Mui-focused": {
											transition: "all 0.7s ease-out"
										},
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
								>
									Password
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-password"
									type={values.showPassword ? "text" : "password"}
									value={values.password}
									onChange={handleChange("password")}
									sx={{
										color:
											theme.palette.mode === "light"
												? theme.palette.hover.table
												: theme.palette.active
									}}
									startAdornment={
										<InputAdornment
											position="start"
											sx={{
												color: theme.palette.gsb.primary
											}}
										>
											<LockIcon />
										</InputAdornment>
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
												sx={{
													color: theme.palette.gsb.primary
												}}
											>
												{values.showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
									label="Password"
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ borderWidth: "0px", borderRadius: "12px" }}
								size="large"
							>
								Sign Up
							</Button>
						</Grid>
						<Grid item sx={{ ml: 1, mt: 1 }}>
							<Link
								to="/login"
								style={{
									color:
										theme.palette.mode === "light"
											? theme.palette.hover.table
											: theme.palette.active
								}}
							>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default SignUpForm;
