import { useEffect } from "react";
import { Container } from "@mui/material";
import { NewPost } from "#Components";

const CreatePost = () => {
	useEffect(() => {
		document.title = "New Post";
	}, []);

	return (
		<Container>
			<NewPost />
		</Container>
	);
};

export default CreatePost;
