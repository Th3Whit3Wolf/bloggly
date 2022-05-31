import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Grid,
	InputAdornment,
	Typography,
	useTheme,
	TextField,
	Tab,
	Tabs
} from "@mui/material";

import {
	Message as MessageIcon,
	Title as TitleIcon,
	PostAdd as PostAddIcon
} from "@mui/icons-material";

import MarkdownPreview from "@uiw/react-markdown-preview";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { materialLight } from "@ddietr/codemirror-themes/theme/material-light";
import { materialDark } from "@ddietr/codemirror-themes/theme/material-dark";

import { PostAPI } from "#Api";
import { UserContext } from "#Context";
import { MainContainer, Notification } from "#Components";

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

const NewPost = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const { user, setUser } = useContext(UserContext);
	const [notif, setNotif] = useState({});
	const [currentTab, setCurrentTab] = useState(0);

	const [postData, setPostData] = useState({
		title: "",
		content: ""
	});

	const notifClose = () => {
		setNotif({});
	};

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
	};

	const handleTitleChange = event => {
		setPostData({ ...postData, title: event.target.value });
	};
	const handleMarkdownChange = value => {
		setPostData({ ...postData, content: value });
	};

	const handleSubmit = event => {
		event.preventDefault();
		const newPostApi = new PostAPI();
		newPostApi
			.create({
				userID: user.info.id,
				...postData
			})
			.then(response => {
				if (response.ok) {
					setNotif({
						title: "Success",
						message: "Post successfully created",
						severity: "success"
					});
					response
						.json()
						.then(data => {
							console.log(data);
							console.log(data.data);
							console.log("/user/post/" + data.data.id);
							const newPostID = data.data.id;
							const refreshPosts = new PostAPI();
							refreshPosts
								.limit(0)
								.userID(user.info.id)
								.get()
								.then(res => res.json())
								.then(data2 => {
									if (Array.isArray(data2.data)) {
										setUser({ ...user, posts: [...data2.data] });
									}
									navigate("/user/post/" + newPostID, { replace: true });
								});
						})
						.catch(error => {
							setNotif({
								title: "Unexpected Error",
								message: error,
								severity: "err"
							});
						});
					console.log(response);
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
		<>
			{Object.keys(notif).length > 0 && (
				<Notification
					show
					message={notif.message}
					title={notif.title}
					severity={notif.severity}
					afterClose={notifClose}
				/>
			)}
			<MainContainer>
				<Typography
					component="h1"
					variant="h3"
					sx={{
						textAlign: "center",
						color: theme.palette.primary.main
					}}
				>
					New Post
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1, flexGrow: 1 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								id="title-input"
								variant="standard"
								value={postData.title}
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
						</Grid>
						<Grid item xs={12}>
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
									value={postData.content}
									height="100%"
									theme={
										theme.palette.mode === "light"
											? materialLight
											: materialDark
									}
									extensions={[
										markdown({
											base: markdownLanguage,
											codeLanguages: languages
										})
									]}
									onChange={value => handleMarkdownChange(value)}
								/>
							</TabPanel>
							<TabPanel value={currentTab} index={1}>
								<MarkdownPreview
									source={postData.content}
									style={{
										color: theme.palette.text.primary,
										backgroundColor: theme.palette.background.default
									}}
								/>
							</TabPanel>
						</Grid>

						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ borderWidth: "0px", borderRadius: "12px" }}
								size="large"
								startIcon={<PostAddIcon />}
							>
								Add New Post
							</Button>
						</Grid>
					</Grid>
				</Box>
			</MainContainer>
		</>
	);
};

export default NewPost;
