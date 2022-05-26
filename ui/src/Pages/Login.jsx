import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container, useTheme } from "@mui/material";
import { LoginForm } from "#Components";
import { UserContext } from "#Context";

const Login = () => {
	const { user } = useContext(UserContext);
	const theme = useTheme();
	useEffect(() => {
		document.title = "Login ";
	}, []);

	if (user?.isLoggedIn) {
		return <Navigate to="/" replace={true} />;
	} else {
		return (
			<Container
				maxWidth="sm"
				sx={{ backgroundColor: theme.palette.gsb.background, borderRadius: 6 }}
			>
				<LoginForm />
			</Container>
		);
	}
};

export default Login;
