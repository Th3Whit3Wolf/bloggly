import { forwardRef, useContext, useState } from "react";
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
	Slide,
	InputAdornment,
	TextField,
	Tab,
	Tabs
} from "@mui/material";
import {
	ChevronLeftRounded as ChevronLeftRoundedIcon,
	Delete,
	Edit as EditIcon,
	Save as SaveIcon,
	Title as TitleIcon,
	Cancel as CancelIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import MarkdownPreview from "@uiw/react-markdown-preview";
import RehypeKatexPlugin from "rehype-katex";
import RemarkMathPlugin from "remark-math";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { materialLight } from "@ddietr/codemirror-themes/theme/material-light";
import { materialDark } from "@ddietr/codemirror-themes/theme/material-dark";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

import { PostAPI } from "#Api";
import { UserContext } from "#Context";
import { MainContainer, Notification } from "#Components";

const LinkBehavior = forwardRef((props, ref) => (
	<NavLink ref={ref} to="/" {...props} role={undefined} />
));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const a11yProps = index => {
	return {
		id: `post-${index === 0 ? "edit" : "preview"}-tab`,
		"aria-controls": `post-tabpanel-${index === 0 ? "edit" : "preview"}`
	};
};

const TabPanel = props => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`post-tabpanel-${index === 0 ? "edit" : "preview"}`}
			aria-labelledby={`post-${index === 0 ? "edit" : "preview"}-tab`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

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
			<Button
				variant="contained"
				aria-label="delete"
				data-testid="deleteButton"
				onClick={handleClickOpen}
				sx={{
					mt: "0.25rem",
					ml: "0.75rem",
					borderRadius: "12px",
					color: theme.palette.gsb.primary,
					backgroundColor: "transparent",
					borderWidth: 0,
					boxShadow: "none"
				}}
			>
				<Delete />
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

/// user and updatedAt are also available
const Post = ({ id: postID, title, content, createdAt }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const theme = useTheme();
	const { user: User, setUser } = useContext(UserContext);
	const [notif, setNotif] = useState({});
	const [currentTab, setCurrentTab] = useState(0);
	const [oldPostData, setOldPostData] = useState({
		title,
		content
	});
	const [newPostData, setNewPostData] = useState({
		title,
		content
	});

	const [editModeOn, setEditModeOn] = useState(false);
	const isUserPost = location.pathname.startsWith("/user");

	const notifClose = () => {
		setNotif({});
	};

	const handleTitleChange = event => {
		if (event.target.value.trim() === "") {
			setNewPostData({ ...newPostData, title: oldPostData.title });
		}
		setNewPostData({ ...newPostData, title: event.target.value });
	};
	const handleMarkdownChange = value => {
		if (value.trim() === "") {
			setNewPostData({ ...newPostData, content: oldPostData.content });
		}
		setNewPostData({ ...newPostData, content: value });
	};

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
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

	const handleEdit = e => {
		e.preventDefault();
		setEditModeOn(!editModeOn);
	};

	const handleSave = e => {
		e.preventDefault();

		const updatePost = new PostAPI();
		updatePost
			.id(postID)
			.update(newPostData)
			.then(response => {
				if (response.ok) {
					setNotif({
						title: "Success",
						message: "Post successfully updated",
						severity: "success"
					});
					setOldPostData({ ...newPostData });
					const refreshPosts = new PostAPI();
					refreshPosts
						.limit(0)
						.userID(User.info.id)
						.get()
						.then(res => res.json())
						.then(data => {
							if (Array.isArray(data.data)) {
								setUser({ ...User, posts: [...data.data] });
								setEditModeOn(false);
							}
						});
				} else {
					response.json().then(data => {
						setNotif({
							title: "Unexpected Error",
							message: data.message,
							severity: "err"
						});
					});
				}
			})
			.catch(err => {
				setNotif({
					title: "Unexpected Error",
					message: err,
					severity: "err"
				});
			});
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
					{editModeOn ? <Grid item xs={1}></Grid> : ""}

					<Grid item xs={isUserPost ? (editModeOn ? 9 : 10) : 12}>
						{editModeOn ? (
							<TextField
								id="title-input"
								variant="standard"
								value={newPostData.title}
								label="Edit Title"
								onChange={handleTitleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<TitleIcon
												sx={{
													color: theme.palette.gsb.primary,
													fontSize: "2.75rem"
												}}
											/>
										</InputAdornment>
									)
								}}
								sx={{
									"& .MuiInputBase-input": {
										fontSize: "3rem",
										lineHeight: 1.167,
										color: theme.palette.text.primary,
										textDecoration: "none"
									},
									"& label": {
										mt: 1.5,
										ml: 0,
										color: theme.palette.primary.main
									}
								}}
							/>
						) : (
							<Typography variant="h3" sx={{ textAlign: "center" }}>
								{oldPostData.title}
							</Typography>
						)}
					</Grid>
					{isUserPost ? (
						<>
							<Grid item xs={1}>
								<Button
									variant="contained"
									aria-label={editModeOn ? "cancel" : "edit"}
									data-testid={editModeOn ? "cancelButton" : "editButton"}
									onClick={handleEdit}
									sx={{
										mt: "0.25rem",
										ml: "0.75rem",
										borderRadius: "12px",
										color: theme.palette.gsb.primary,
										backgroundColor: "transparent",
										borderWidth: 0,
										boxShadow: "none"
									}}
								>
									{editModeOn ? <CancelIcon /> : <EditIcon />}
								</Button>
							</Grid>
							<Grid item xs={1}>
								{editModeOn ? (
									<Button
										variant="contained"
										aria-label={"save"}
										data-testid={"saveButton"}
										startIcon={<SaveIcon />}
										onClick={handleSave}
										sx={{
											mt: "0.25rem",
											ml: "0.75rem",
											borderRadius: "12px",
											color: theme.palette.gsb.primary,
											backgroundColor: "transparent",
											borderWidth: 0,
											boxShadow: "none"
										}}
									>
										<Typography variant="body2">Save Changes</Typography>
									</Button>
								) : (
									<DeleteDialog
										id={postID}
										handleDelete={handleDelete}
										theme={theme}
									/>
								)}
							</Grid>
						</>
					) : (
						""
					)}
				</Grid>
			</Box>

			<Box sx={{ pl: "2rem", pr: "2rem" }}>
				{editModeOn ? (
					<>
						<Box>
							<Tabs
								value={currentTab}
								onChange={handleTabChange}
								aria-label="post-tabs"
							>
								<Tab
									label="Edit"
									{...a11yProps(0)}
									sx={{
										backgroundColor:
											currentTab === 0
												? theme.palette.gsb.background
												: "transparent"
									}}
								/>
								<Tab
									label="Preview"
									{...a11yProps(1)}
									sx={{
										backgroundColor:
											currentTab === 1
												? theme.palette.gsb.background
												: "transparent"
									}}
								/>
							</Tabs>
						</Box>
						<TabPanel value={currentTab} index={0}>
							<CodeMirror
								value={newPostData.content}
								height="100%"
								theme={
									theme.palette.mode === "light" ? materialLight : materialDark
								}
								extensions={[
									markdown({ base: markdownLanguage, codeLanguages: languages })
								]}
								onChange={value => handleMarkdownChange(value)}
							/>
						</TabPanel>
						<TabPanel value={currentTab} index={1}>
							<MarkdownPreview
								source={newPostData.content}
								style={{
									color: theme.palette.text.primary,
									backgroundColor: theme.palette.background.default
								}}
								remarkPlugins={[RemarkMathPlugin]}
								rehypePlugins={[RehypeKatexPlugin]}
							/>
						</TabPanel>
					</>
				) : (
					<MarkdownPreview
						source={oldPostData.content}
						style={{
							color: theme.palette.text.primary,
							backgroundColor: theme.palette.background.default
						}}
						remarkPlugins={[RemarkMathPlugin]}
						rehypePlugins={[RehypeKatexPlugin]}
					/>
				)}
			</Box>
		</MainContainer>
	);
};

export default Post;
