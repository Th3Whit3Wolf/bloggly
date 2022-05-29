import { useEffect, forwardRef } from "react";
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
	PaidOutlined as PaidOutlinedIcon,
	Message as MessageIcon
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

import HeroIMG from "../Assets/Imgs/hero.jpg";
import { MainContainer } from "#Components";

const LinkBehavior = forwardRef((props, ref) => (
	<NavLink ref={ref} to="/" {...props} role={undefined} />
));

const Landing = () => {
	const theme = useTheme();
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

	useEffect(() => {
		document.title = "Welcome to Bloggly ";
	}, []);

	return (
		<Box
			sx={{
				position: "absolute",
				top: "100px",
				left: 0,
				width: "100vw",
				height: "77vh",
				backgroundImage: `url(${HeroIMG})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				p: 0,
				m: 0
			}}
		>
			<Container sx={{ pl: "4rem", pr: "4rem", maxWidth: "125ch" }}>
				<Grid container spacing={2} sx={{ mt: 0, pt: 0 }}>
					<Grid item xs={12} sx={{ height: "77vh", pt: 0, mt: 0 }}>
						<Typography
							variant="h3"
							sx={{
								textAlign: "center",
								mt: "10vh",
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
								mb: "calc(77vh - 17vh - 8.6876rem - 16px)",
								color: "#eee"
							}}
						>
							Blogs and stuff
						</Typography>

						<Typography
							variant="h6"
							sx={{
								textAlign: "center",
								color: "#333"
							}}
						>
							come for the blogs and stay for the stuff
						</Typography>
						<Typography
							component="div"
							sx={{
								textAlign: "center"
							}}
						>
							<Button
								variant="contained"
								aria-label="view posts"
								data-testid="viewAllPostsButton"
								component={LinkBehavior}
								to="/posts"
								startIcon={<MessageIcon />}
								sx={{
									mt: "0.25rem",
									ml: "0.75rem",
									p: "6px 16px",
									borderRadius: "12px",
									borderColor: theme.palette.gsb.primary,
									backgroundColor: theme.palette.gsb.primary
								}}
							>
								<Typography variant="body2">View Blogs</Typography>
							</Button>
						</Typography>
					</Grid>

					<Grid item xs={12} sx={{ mt: "1rem" }}>
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
									minHeight={220}
									key={item.id}
									sx={{
										p: "0.75rem",
										m: "1rem",
										textAlign: "center",
										backgroundColor: theme.palette.gsb.background,
										borderRadius: "12px",
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
			</Container>
		</Box>
	);
};

export default Landing;
