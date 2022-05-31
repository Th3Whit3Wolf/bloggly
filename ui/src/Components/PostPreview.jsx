import { forwardRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Typography, useTheme, Button, Box, Avatar } from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import MarkdownPreview from "@uiw/react-markdown-preview";
import RehypeKatexPlugin from "rehype-katex";
import RemarkMathPlugin from "remark-math";
import "katex/dist/katex.min.css";
import truncateMarkdown from "markdown-truncate";

import { UserContext } from "#Context";

const LinkBehavior = forwardRef((props, ref) => (
	<NavLink ref={ref} to="/" {...props} role={undefined} />
));

const PostPreview = ({
	id: postID,
	title,
	content,
	user,
	createdAt,
	/*updatedAt,*/
	spotlight
}) => {
	const theme = useTheme();
	const { id: userID, firstName, lastName, username } = user;
	const { user: User } = useContext(UserContext);

	const contentMD = truncateMarkdown(content, {
		limit: 100,
		ellipsis: true
	});
	return (
		<>
			<Typography
				fontWeight="bold"
				variant="h6"
				component={LinkBehavior}
				to={`${
					User.isLoggedIn && User?.info.id === userID ? "/user" : ""
				}/post/${postID}`}
				sx={{
					mb: 0.5,
					color: theme.palette.gsb.primary,
					textDecoration: "none",
					"&:hover": {
						textDecoration: "underline"
					}
				}}
			>
				{title}
			</Typography>
			<Typography component="div" sx={{ mb: "auto" }}>
				<MarkdownPreview
					source={contentMD}
					style={{
						color: theme.palette.text.primary,
						backgroundColor: spotlight
							? theme.palette.mode === "light"
								? "#ffffff"
								: "#263747"
							: theme.palette.background.default
					}}
					remarkPlugins={[RemarkMathPlugin]}
					rehypePlugins={[RehypeKatexPlugin]}
				/>
			</Typography>
			<Avatar
				sx={{ bgcolor: theme.palette.gsb.primary, m: "0.5rem" }}
				aria-label="user avatar"
			>
				{(firstName[0] + lastName[0]).toUpperCase()}
			</Avatar>
			<Box
				sx={{
					display: { sm: "block", md: "flex" },
					justifyContent: "space-between",
					alignItems: "end"
				}}
			>
				<Box sx={{ position: "relative", pl: "0.5rem" }}>
					<Typography variant="body2" fontWeight="bold" color="primary">
						{firstName} {lastName}
					</Typography>

					<Typography variant="caption" fontWeight="400">
						{new Date(createdAt).toLocaleDateString("en-us", {
							year: "numeric",
							month: "long",
							day: "numeric"
						})}
					</Typography>
				</Box>
				<Button
					component={LinkBehavior}
					aria-describedby={`describe-${postID}`}
					to={`${
						User.isLoggedIn && User?.info.id === userID ? "/user" : ""
					}/post/${postID}`}
					id={`describe-${username}-post-${postID}`}
					size="small"
					endIcon={<KeyboardArrowRightRoundedIcon />}
					sx={{
						mt: { xs: 1, md: 0 },
						mb: { xs: -1, md: 0 },
						color: theme.palette.gsb.primary,
						"& .MuiButton-endIcon": {
							ml: 0
						},
						border: "none",
						fontWeight: "bold"
					}}
				>
					Read More
				</Button>
			</Box>
		</>
	);
};

export default PostPreview;
