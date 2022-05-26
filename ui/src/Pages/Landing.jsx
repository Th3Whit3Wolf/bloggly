import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	Box,
	Grid,
	Typography,
	useTheme,
	Button,
	Container
} from "@mui/material";
import {
	EngineeringOutlined as EngineeringOutlinedIcon,
	AllInclusive as AllInclusiveIcon,
	PaidOutlined as PaidOutlinedIcon
} from "@mui/icons-material";
import HeroIMG from "../Assets/Imgs/hero.jpg";

const Landing = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const sectionItems = [
		{
			id: 1,
			icon: (
				<EngineeringOutlinedIcon
					sx={{
						fontSize: 100,
						color: theme.palette.gsb.primary
					}}
				/>
			),
			sentence: "Bloggy solves blogging problems through blogging means."
		},
		{
			id: 2,
			icon: (
				<AllInclusiveIcon
					sx={{
						fontSize: 100,
						color: theme.palette.gsb.primary
					}}
				/>
			),
			sentence: "Through bloggly, we can all stop... collaborate and listen"
		},
		{
			id: 3,
			icon: (
				<PaidOutlinedIcon
					sx={{
						fontSize: 100,
						color: theme.palette.gsb.primary
					}}
				/>
			),
			sentence: "We will take your money"
		}
	];

	const handleLogin = e => {
		e.preventDefault();
		navigate("/login");
	};

	const handleSignUp = e => {
		e.preventDefault();
		navigate("/signup");
	};
	useEffect(() => {
		document.title = "Welcome to Bloggly ";
	}, []);

	return (
		<Box
			sx={{
				p: 0,
				mt: "100px",
				width: "100%",
				height: "calc(80vh - 100px)",
				backgroundImage: `url(${HeroIMG})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover"
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} sx={{ mb: "2rem" }}>
					<Typography
						variant="h3"
						sx={{
							textAlign: "center",
							mt: "calc(100px + 10vh)",
							color: "#fff"
						}}
					>
						Bloggly
					</Typography>
					<Typography
						variant="h4"
						sx={{
							textAlign: "center",
							mt: "1vh",
							mb: "39vh",
							color: "#eee"
						}}
					>
						Blogs and stuff
					</Typography>
				</Grid>
				<Grid item xs={2} sx={{ mb: "2rem" }}>
					<Container
						disableGutters
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-end",
							color: theme.palette.gsb.text,
							alignItems: "left",
							whiteSpace: "no-wrap",
							pr: "1rem"
						}}
					>
						<Button
							variant="contained"
							onClick={handleLogin}
							data-testid="loginButtonHero"
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
					</Container>
				</Grid>
				<Grid item xs={8} sx={{ mb: "2rem" }}>
					<Typography
						variant="h6"
						sx={{
							textAlign: "center",
							color: "#333"
						}}
					>
						come for the blogs and stay for the stuff
					</Typography>
				</Grid>
				<Grid item xs={2} sx={{ mb: "2rem" }}>
					<Container
						disableGutters
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-start",
							color: theme.palette.gsb.text,
							alignItems: "left",
							whiteSpace: "no-wrap",
							pr: "1rem"
						}}
					>
						<Button
							variant="Sign Up"
							onClick={handleSignUp}
							data-testid="signupButtonHero"
							sx={{
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
					</Container>
				</Grid>
				<Grid item xs={12}>
					<Grid
						container
						spacing={2}
						sx={{
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						{sectionItems.map(item => (
							<Grid
								item
								xs={12}
								md={3.5}
								minHeight={300}
								key={item.id}
								sx={{
									p: "0.25rem 0.5rem",
									m: "1rem",
									mt: "2rem",
									textAlign: "center",
									backgroundColor: theme.palette.gsb.background,
									borderRadius: "10px",
									maxWidth: "200px",
									color:
										theme.palette.mode === "light"
											? theme.palette.hover.table
											: theme.palette.active
								}}
							>
								{item.icon}
								<Typography sx={{ pt: "1rem" }}>{item.sentence}</Typography>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Landing;
