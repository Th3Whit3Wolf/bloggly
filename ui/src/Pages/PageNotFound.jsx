import { useEffect } from "react";

// Third Party Components and Utilities
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";

import background from "#Assets/Imgs/PageNotFound.jpg";
const PageNotFound = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	useEffect(() => {
		document.title = "Page not found ";
	}, []);

	const handleGoHome = e => {
		e.preventDefault();
		navigate("/", { replace: true });
	};
	return (
		<Box
			sx={{
				backgroundImage: `url(${background})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				width: "100%",
				height: "100vh",
				m: 0,
				p: 0
			}}
		>
			<Box
				sx={{
					ml: "3rem",
					pt: "7rem",
					pl: "4rem"
				}}
			>
				<Container
					sx={{
						pt: "2rem",
						pl: "2rem"
					}}
				>
					<Typography
						variant="h2"
						align="center"
						sx={{ p: "1rem", color: theme.astroUXDSTheme.quaternary.lighten1 }}
					>
						404 - Page not found
					</Typography>
					<Typography
						variant="h3"
						sx={{
							ml: "4rem",
							mt: "1rem",
							pl: "1rem",
							color: theme.astroUXDSTheme.quaternary.base
						}}
					>
						Well this is embarassing ...
					</Typography>
					<Typography
						variant="h3"
						sx={{
							ml: "4rem",
							mt: "0.25rem",
							pl: "1rem",
							color: theme.astroUXDSTheme.quaternary.darken1
						}}
					>
						We appear to have lost your page
					</Typography>
				</Container>

				<Button
					variant="contained"
					size="large"
					sx={{
						ml: "7rem",
						mt: "5rem",
						backgroundColor: theme.palette.gsb.primary
					}}
					onClick={handleGoHome}
				>
					Go Home
				</Button>
			</Box>
		</Box>
	);
};

export default PageNotFound;
