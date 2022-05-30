import { forwardRef, useContext, useState, useEffect } from "react";
import {
	Box,
	Button,
	Stack,
	Typography,
	useTheme,
	Grid,
	Dialog,
	DialogContent,
	DialogActions,
	DialogTitle,
	DialogContentText,
	Slide
} from "@mui/material";
import { styled } from "@mui/material/styles";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import {
	ChevronLeftRounded as ChevronLeftRoundedIcon,
	Delete,
	Edit as EditIcon
} from "@mui/icons-material";

import { PostAPI } from "#Api";
import { UserContext } from "#Context";
import { MainContainer, Notification } from "#Components";

const LinkBehavior = forwardRef((props, ref) => (
	<NavLink ref={ref} to="/" {...props} role={undefined} />
));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Box)(({ theme }) => ({
	...theme.typography.body2,
	padding: 0,
	textAlign: "left",
	color: theme.palette.text.secondary
}));

const DeleteDialog = ({ id, handleDelete, theme }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAgree = () => {
		handleDelete(id);
		setOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClickOpen} sx={{ border: "none" }}>
				<Delete sx={{ color: theme.palette.gsb.primary }} />
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="delete-dialog-description"
				sx={{ borderTopRightRadius: "6px", borderTopLeftRadius: "6px" }}
				PaperProps={{
					sx: {
						borderTopRightRadius: "6px",
						borderTopLeftRadius: "6px",
						p: 0,
						m: 0
					}
				}}
			>
				<DialogTitle
					sx={{
						textAlign: "center",
						borderTopRightRadius: "6px",
						borderTopRightLeft: "6px",
						color: theme.palette.gsb.text,
						backgroundColor: theme.palette.gsb.background
					}}
				>
					Delete Post
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-slide-description"
						component="div"
					>
						<Typography variant="h4" sx={{ mt: 2, textAlign: "center" }}>
							Are you sure you want to delete this post?
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleAgree}
						autoFocus
						sx={{ border: "none", fontWeight: "bold" }}
					>
						Yes
					</Button>
					<Button
						onClick={handleClose}
						sx={{
							border: "none",
							fontWeight: "bold",
							color: theme.palette.gsb.primary
						}}
					>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const Post = ({ id: postID, title, content, user, createdAt, updatedAt }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const theme = useTheme();
	const { user: User, setUser } = useContext(UserContext);
	const [notif, setNotif] = useState({});
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

	const notifClose = () => {
		setNotif({});
	};

	const handleDelete = value => {
		const deletePost = new PostAPI();
		deletePost
			.id(value)
			.delete()
			.then(response => {
				if (response.ok) {
					setNotif({
						title: "Success",
						message: "Post successfully deleted",
						severity: "success"
					});
					const refreshPosts = new PostAPI();
					refreshPosts
						.limit(0)
						.userID(User.info.id)
						.get()
						.then(res => res.json())
						.then(data => {
							if (Array.isArray(data.data)) {
								setUser({ ...User, posts: [...data.data] });
								navigate("/user/posts", {
									replace: true
								});
							}
						});
				} else {
					setNotif({
						title: "Error",
						message: "Something went wrong",
						severity: "error"
					});
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<MainContainer>
			{Object.keys(notif).length > 0 && (
				<Notification
					show
					message={notif.message}
					title={notif.title}
					severity={notif.severity}
					afterClose={notifClose}
				/>
			)}

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
				<Grid container spacing={2}>
					<Grid item xs={10}>
						<Typography variant="h3" sx={{ textAlign: "center" }}>
							{title}
						</Typography>
					</Grid>

					<Grid item xs={1}>
						<Button sx={{ border: "none" }}>
							<EditIcon sx={{ color: theme.palette.gsb.primary }} />
						</Button>
					</Grid>
					<Grid item xs={1}>
						<DeleteDialog
							id={postID}
							handleDelete={handleDelete}
							theme={theme}
						/>
					</Grid>
				</Grid>
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
