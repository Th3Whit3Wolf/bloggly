import React, { useContext } from "react";
import logo from "../logo.svg";
import { UserContext, ColorModeContext } from "#Context";
import {
	Button,
	AppBar,
	Box,
	Toolbar,
	useTheme,
	Container,
	Grid
} from "@mui/material";
import {
	Brightness2 as Brightness2Icon,
	Brightness7 as Brightness7Icon
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
// Also need a small title shows USER or ADMIN

const Header = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { toggleColorMode } = useContext(ColorModeContext);
	const { user, setUser } = useContext(UserContext);

	const handleLogOut = e => {
		e.preventDefault();
		fetch(
			import.meta.env.PROD
				? "https://bloggly-api.herokuapp.com/api/v1/logout"
				: "http://localhost:8081/api/v1/logout"
		).then(res => {
			if (res.ok()) {
				setUser({ isLoggedIn: false });
				navigate("/");
			}
		});
	};

	const handleLogin = e => {
		e.preventDefault();
		navigate("/login");
	};

	const handleSignUp = e => {
		e.preventDefault();
		navigate("/signup");
	};

	return (
		<AppBar
			position="fixed"
			enableColorOnDark
			sx={{
				height: 100,
				display: "flex",
				padding: "5px 5px 5px 25px",
				flexGrow: 1,
				zIndex: thm => thm.zIndex.drawer + 1,
				backgroundColor: theme.palette.gsb.background
			}}
		>
			<Toolbar disableGutters>
				<NavLink to="/">
					<Box
						disableGutters
						component="img"
						sx={{
							p: 0,
							m: 0,
							height: 80,
							width: 70,
							mr: "15px"
						}}
						src={logo}
						alt="Space Force Logo"
					/>
				</NavLink>

				<Container disableGutters>
					<h1
						style={{
							color: theme.palette.gsb.text,
							marginBottom: user?.role ? -20 : 0
						}}
					>
						<span style={{ color: theme.palette.gsb.text }}>Bloggly</span>
					</h1>

					{user?.role && (
						<h6 style={{ color: theme.palette.gsb.primary }}>
							{user.role.kind.replace("_", " ")} VIEW
						</h6>
					)}
				</Container>
				<Grid
					container
					spacing={1}
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
						p: "0 0.5rem"
					}}
				>
					<Grid xs={6} item></Grid>
					<Grid xs={5} item>
						<Container
							disableGutters
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-end",
								color: theme.palette.gsb.text,
								alignItems: "center",
								whiteSpace: "no-wrap",
								pr: "1rem"
							}}
						>
							<Button
								variant="contained"
								sx={{
									mt: "0.25rem",
									ml: "0.5rem",
									borderWidth: "2px",
									borderRadius: "12px",
									backgroundColor: theme.palette.gsb.primary,
									flexShrink: 0
								}}
								onClick={toggleColorMode}
								data-testid="themeToggleButton"
							>
								{theme.palette.mode === "light" ? (
									<Brightness7Icon />
								) : (
									<Brightness2Icon />
								)}
							</Button>
							{(user?.isLoggedIn && (
								<Button
									variant="contained"
									onClick={handleLogOut}
									data-testid="logoutButton"
									sx={{
										mt: "0.25rem",
										ml: "0.5rem",
										borderWidth: "2px",
										borderRadius: "12px",
										backgroundColor: theme.palette.gsb.primary,
										flexShrink: 0
									}}
								>
									Logout
								</Button>
							)) || (
								<>
									<Button
										variant="contained"
										onClick={handleLogin}
										data-testid="loginButton"
										sx={{
											mt: "0.25rem",
											ml: "0.5rem",
											borderWidth: "2px",
											borderRadius: "12px",
											backgroundColor: theme.palette.gsb.primary,
											flexShrink: 0
										}}
									>
										Log In
									</Button>
									<Button
										variant="Sign Up"
										onClick={handleSignUp}
										data-testid="signupButton"
										sx={{
											mt: "0.25rem",
											ml: "0.5rem",
											color: theme.palette.gsb.primary,
											borderWidth: "2px",
											borderStyle: "solid",
											borderRadius: "12px",
											borderColor: theme.palette.gsb.primary,
											flexShrink: 0
										}}
									>
										Sign Up
									</Button>
								</>
							)}
						</Container>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
