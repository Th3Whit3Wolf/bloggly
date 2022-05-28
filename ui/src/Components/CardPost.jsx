import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	useTheme,
	Button
} from "@mui/material";
import { Avatar, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MarkdownPreview from "@uiw/react-markdown-preview";
import truncateMarkdown from "markdown-truncate";

const CardPost = ({ id, title, content, user, createdAt, updatedAt }) => {
	const theme = useTheme();
	const { id: userID, firstName, lastName, username } = user;

	const contentMD = truncateMarkdown(content, {
		limit: 100,
		ellipsis: true
	});

	/*
		let increment = 0;
	let chars = Array.from(content);
	let desc = [];

	let startedLinkName = false;
	let finishedLinkName = false;
	let startedLinkChar = false;
	let finishedLinkChar = false;

	chars.forEach(char => {
		if (char === "[") {
			startedLinkName = true;
		}
		if (startedLinkName && !finishedLinkName && char === "]") {
			finishedLinkName = true;
		}
		if (finishedLinkName && char === "(") {
			startedLinkChar = true;
		}
		if (startedLinkChar && char === ")") {
			startedLinkName = false;
			finishedLinkName = false;
			startedLinkChar = false;
		}
		if (
			!["*", "_", "`", "[", "]", "(", ")", "#", "\n"].includes(char) &&
			((startedLinkName && !finishedLinkName) || startedLinkChar === false)
		) {
			increment += 1;
		}
		if (increment <= 100) {
			desc.push(char);
		}
	});
	*/
	// let contentMD =
	// 	content.length > 100 ? content.slice(0, 100) + "..." : content;

	return (
		<Card sx={{ maxWidth: 500 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography
					variant="subtitle2"
					sx={{ ml: 4, alignSelf: "center", textAlign: "center" }}
				>
					<CalendarMonthIcon />
					{new Date(createdAt).toLocaleDateString("en-us", {
						year: "numeric",
						month: "long",
						day: "numeric"
					})}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					<MarkdownPreview source={contentMD} />
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" color="primary">
					Read more ...
				</Button>
			</CardActions>
		</Card>
	);
};

export default CardPost;
