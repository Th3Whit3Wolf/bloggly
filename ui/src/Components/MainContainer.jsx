import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";

const StyledContainer = styled(Container)(({ theme }) => {
	return {
		paddingTop: 30,
		maxWidth: "105ch",
		[theme.breakpoints.up("lg")]: {
			paddingLeft: theme.spacing(8),
			paddingRight: theme.spacing(8)
		}
	};
});

const MainContainer = props => {
	return (
		<StyledContainer
			id="main-content"
			maxWidth={false}
			tabIndex={-1}
			{...props}
		/>
	);
};

export default MainContainer;
