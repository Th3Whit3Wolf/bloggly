import { forwardRef, useContext, useState, useEffect } from "react";
import {
	Box,
	Button,
	Container,
	Stack,
	Typography,
	useTheme
} from "@mui/material";
import { styled } from "@mui/material/styles";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { useLocation, NavLink } from "react-router-dom";
import { ChevronLeftRounded as ChevronLeftRoundedIcon } from "@mui/icons-material";

import { UserContext } from "#Context";
import { MainContainer } from "#Components";

const LinkBehavior = forwardRef((props, ref) => (
	<NavLink ref={ref} to="/" {...props} role={undefined} />
));

const Item = styled(Box)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	textAlign: "left",
	color: theme.palette.text.secondary
}));

const Post = ({ id: postID, title, content, user, createdAt, updatedAt }) => {
	const location = useLocation();
	const theme = useTheme();
	const { user: User } = useContext(UserContext);
	const isUserPost = location.pathname.startsWith("/user");
	const { id: userID, firstName, lastName, username } = user;

	/*
    console.log(
		{ postID },
		{ title },
		{ content },
		{ user },
		{ createdAt },
		{ updatedAt }
	);
    */
	return (
		<MainContainer>
			<Stack spacing={0}>
				<Item>
					<Button
						variant="outlined"
						aria-label="sign up"
						data-testid="signupButton"
						component={LinkBehavior}
						to="/signup"
						startIcon={<ChevronLeftRoundedIcon />}
						sx={{
							mt: "0.25rem",
							ml: "0.75rem",
							p: "6px 16px",
							color: theme.palette.gsb.primary,
							borderRadius: "12px",
							borderWidth: 0
						}}
					>
						Back to blog
					</Button>
				</Item>
				<Item>
					<Typography variant="caption" fontWeight="500" sx={{ ml: 5 }}>
						{new Intl.DateTimeFormat("en", {
							weekday: "long",
							year: "numeric",
							month: "short",
							day: "numeric"
						}).format(new Date(createdAt))}
					</Typography>
				</Item>
			</Stack>

			<Box sx={{ p: "0.5rem" }}>
				<Typography variant="h3" sx={{ textAlign: "center" }}>
					{title}
				</Typography>
			</Box>

			<Box sx={{ pl: "2rem", pr: "2rem" }}>
				<MarkdownPreview
					source={content}
					style={{
						color: theme.palette.text.primary,
						backgroundColor: theme.palette.background.default
					}}
				/>
			</Box>
		</MainContainer>
	);
};

export default Post;
