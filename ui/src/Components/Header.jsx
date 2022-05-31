import { useContext, forwardRef } from "react";
import logo from "../logo.svg";
import { UserContext, ColorModeContext } from "#Context";
import {
	Button,
	AppBar,
	Box,
	Toolbar,
	useTheme,
	Container,
	Grid,
	Typography
} from "@mui/material";
import {
	Brightness2 as Brightness2Icon,
	Brightness7 as Brightness7Icon,
	AppRegistration as AppRegistrationIcon,
	Login as LoginIcon,
	Logout as LogoutIcon
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

const LinkBehavior = forwardRef((props, ref) => (
	<NavLink ref={ref} to="/" {...props} role={undefined} />
));

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
			if (res.ok) {
				console.info("Successfully logged out");
				setUser({ isLoggedIn: false });
				navigate("/", { replace: true });
			}
		});
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
				<Button component={LinkBehavior} sx={{ border: 0 }}>
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
				</Button>

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
									borderRadius: "12px",
									borderColor: theme.palette.gsb.primary,
									backgroundColor: theme.palette.gsb.primary,
									flexShrink: 0
								}}
								onClick={toggleColorMode}
								aria-label={
									theme.palette.mode === "light"
										? "switch to dark mode"
										: "switch to light mode"
								}
								data-testid="themeToggleButton"
							>
								{theme.palette.mode === "light" ? (
									<Brightness7Icon fontSize="small" />
								) : (
									<Brightness2Icon fontSize="small" />
								)}
							</Button>
							{(user?.isLoggedIn && (
								<Button
									variant="contained"
									onClick={handleLogOut}
									aria-label="lot out"
									data-testid="logoutButton"
									startIcon={<LogoutIcon />}
									sx={{
										mt: "0.25rem",
										ml: "0.75rem",
										borderRadius: "12px",
										borderColor: theme.palette.gsb.primary,
										backgroundColor: theme.palette.gsb.primary,
										flexShrink: 0
									}}
								>
									<Typography variant="body2">Log Out</Typography>
								</Button>
							)) || (
								<>
									<Button
										variant="contained"
										aria-label="log in"
										data-testid="loginButton"
										component={LinkBehavior}
										to="/login"
										startIcon={<LoginIcon />}
										sx={{
											mt: "0.25rem",
											ml: "0.75rem",
											borderRadius: "12px",
											borderColor: theme.palette.gsb.primary,
											backgroundColor: theme.palette.gsb.primary,
											flexShrink: 0
										}}
									>
										<Typography variant="body2">Log In</Typography>
									</Button>
									<Button
										variant="outlined"
										aria-label="sign up"
										data-testid="signupButton"
										component={LinkBehavior}
										to="/signup"
										startIcon={<AppRegistrationIcon />}
										sx={{
											mt: "0.25rem",
											ml: "0.75rem",
											p: "6px 16px",
											color: theme.palette.gsb.primary,
											borderRadius: "12px",
											borderColor: theme.palette.gsb.primary,
											flexShrink: 0
										}}
									>
										<Typography variant="body2">Sign Up</Typography>
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
