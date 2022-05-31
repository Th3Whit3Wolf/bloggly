import { useEffect } from "react";
import { Container, useTheme } from "@mui/material";
import { NewPost } from "#Components";

const CreatePost = () => {
	const theme = useTheme();
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
