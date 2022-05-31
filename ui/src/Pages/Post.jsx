import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Post as PostComponent } from "#Components";
import { UserContext } from "#Context";
import { PostAPI } from "#Api";

const Post = () => {
	const { id } = useParams();
	const postID = parseInt(id);
	const { user } = useContext(UserContext);
	const location = useLocation();
	const isUserPost = location.pathname.startsWith("/user");

	const [post, setPost] = useState(
		isUserPost ? user.posts.find(p => p.id === postID) : {}
	);
	if (isUserPost) {
		//console.log(user.posts.find(p => p.id === postID));
	}
	//console.log("Post ID: ", postID);

	useEffect(() => {
		if (!isUserPost) {
			const postAPI = new PostAPI();
			postAPI
				.id(postID)
				.get()
				.then(res => {
					if (res.ok) {
						return res.json();
					} else {
						Promise.resolve({});
					}
				})
				.then(data => {
					if (Object.keys(data).length > 0) {
						setPost(data.data[0]);

						//console.log("Post Data", data.data[0]);
					} else {
						setPost({
							title: "Post not found",
							content: "Post not found",
							user: {
								id: "",
								firstName: "",
								lastName: "",
								username: ""
							},
							createdAt: "",
							updatedAt: ""
						});
					}
				});
		} else {
			//console.log({ post });
		}
		document.title = post.title;
	});
	return (
		<Container>
			{Object.keys(post).length > 0 ? (
				<PostComponent {...post} />
			) : (
				<div>Loading...</div>
			)}
		</Container>
	);
};

export default Post;
