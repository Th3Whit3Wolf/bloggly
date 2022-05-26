import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container, useTheme } from "@mui/material";
import { SignUpForm } from "#Components";
import { UserContext } from "#Context";

const SignUp = () => {
	const { user } = useContext(UserContext);
	const theme = useTheme();
	useEffect(() => {
		document.title = "Sign Up ";
	}, []);

	if (user?.isLoggedIn) {
		return <Navigate to="/" replace={true} />;
	} else {
		return (
			<Container
				maxWidth="sm"
				sx={{ backgroundColor: theme.palette.gsb.background, borderRadius: 6 }}
			>
				<SignUpForm />
			</Container>
		);
	}
};

export default SignUp;
