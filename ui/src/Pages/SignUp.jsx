import { useEffect } from "react";
import { Container, useTheme } from "@mui/material";
import { SignUpForm } from "#Components";

const SignUp = () => {
	const theme = useTheme();
	useEffect(() => {
		document.title = "Sign Up ";
	}, []);

	return (
		<Container
			maxWidth="sm"
			sx={{ backgroundColor: theme.palette.gsb.background, borderRadius: 6 }}
		>
			<SignUpForm />
		</Container>
	);
};

export default SignUp;
