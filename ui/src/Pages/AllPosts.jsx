import { useState, useEffect } from "react";
import { Container } from "@mui/material";

import { PostAPI } from "#Api";
import { PostList } from "#Components";

const AllPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (posts.length < 1) {
			const Post = new PostAPI();
			Post.limit(0)
				.get()
				.then(res => res.json())
				.then(data => {
					if (Array.isArray(data.data)) {
						setPosts([...posts, ...data.data]);
					}
				});
		}
		document.title = "Your Posts";
	});

	return (
		<Container>
			<PostList posts={posts} />
		</Container>
	);
};

export default AllPosts;
