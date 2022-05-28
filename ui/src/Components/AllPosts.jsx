import React, { useContext, useState, useEffect } from "react";
import { PostAPI } from "#Api";
import { UserContext, ColorModeContext } from "#Context";
import {
	Button,
	AppBar,
	Box,
	Toolbar,
	useTheme,
	Container,
	Grid,
	Typography
} from "@mui/material";
import {
	Brightness2 as Brightness2Icon,
	Brightness7 as Brightness7Icon
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

import { CardPost } from ".";

const AllPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (posts.length < 20) {
			const Post = new PostAPI();
			Post.get()
				.then(res => res.json())
				.then(data => {
					if (Array.isArray(data.data)) {
						setPosts([...posts, ...data.data]);
					}
				});
		}
	});

	const postJSX = posts.map(post => {
		return (
			<>
				<CardPost key={post.id} {...post}></CardPost>
				<Toolbar />
			</>
		);
	});

	return (
		<Container>
			<Toolbar />
			<Toolbar />
			<Typography variant="h1" component="h2">
				All Posts
			</Typography>
			{posts.length > 0 ? postJSX : ""}
		</Container>
	);
};

export default AllPosts;
