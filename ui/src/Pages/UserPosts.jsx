import { useContext, useState, useEffect } from "react";
import { Container } from "@mui/material";

import { PostAPI } from "#Api";
import { PostList } from "#Components";
import { UserContext } from "#Context";

const UserPosts = () => {
	const { user, setUser } = useContext(UserContext);
	const [posts, setPosts] = useState(user.posts);

	useEffect(() => {
		if (posts.length < 1) {
			const Post = new PostAPI();
			Post.limit(0)
				.userID(user.info.id)
				.get()
				.then(res => res.json())
				.then(data => {
					if (Array.isArray(data.data)) {
						setUser({ ...user, posts: [...posts, ...data.data] });
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

export default UserPosts;
