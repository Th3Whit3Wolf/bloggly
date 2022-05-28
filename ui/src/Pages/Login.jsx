import { useEffect } from "react";
import { Container, useTheme } from "@mui/material";
import { LoginForm } from "#Components";

const Login = () => {
	const theme = useTheme();
	useEffect(() => {
		document.title = "Login ";
	}, []);

	return (
		<Container
			maxWidth="sm"
			sx={{ backgroundColor: theme.palette.gsb.background, borderRadius: 6 }}
		>
			<LoginForm />
		</Container>
	);
};

export default Login;
