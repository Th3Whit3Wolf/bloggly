import { useState } from "react";
import {
	Box,
	useTheme,
	Container,
	Paper,
	Typography,
	Pagination
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { PostPreview } from "#Components";

const PAGE_SIZE = 5;

const PostList = ({ posts }) => {
	const theme = useTheme();
	const location = useLocation();
	const isUserPost = location.pathname.startsWith("/user");
	const [page, setPage] = useState(0);

	const pageStart = page * PAGE_SIZE;
	let pinnedPosts, otherPosts;
	if (posts.length > 2) {
		const [firstPost, secondPost, ...remaining] = posts;
		pinnedPosts = [firstPost, secondPost];
		otherPosts = remaining;
	} else {
		pinnedPosts = posts;
		otherPosts = [];
	}

	const totalPage = Math.ceil(otherPosts.length / PAGE_SIZE);
	const displayedPosts = otherPosts.slice(pageStart, pageStart + PAGE_SIZE);

	return (
		<Container>
			<Typography
				variant="h4"
				color="primary"
				fontWeight="bold"
				textAlign="center"
				sx={{ mb: "2rem" }}
			>
				{isUserPost ? "Your Posts" : "All Posts"}
			</Typography>
			<Box
				component="ul"
				sx={{
					display: "grid",
					m: 0,
					p: 0,
					gap: 2,
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
				}}
			>
				{pinnedPosts.map(post => {
					return (
						<Paper
							key={post.id}
							component="li"
							sx={{
								ml: 1,
								p: 2,
								display: "flex",
								flexDirection: "column",
								position: "relative",
								borderRadius: "12px",
								transition: "all ease 120ms",
								borderStyle: "solid",
								borderWidth: "1px",
								backgroundColor: theme.palette.background.paper,
								borderColor:
									theme.palette.mode === "light" ? "#E0E0E0" : "#162634",
								boxShadow:
									theme.palette.mode === "light"
										? "0 .75em 1.5em -.185em rgba(	10, 10, 10,.2), 0 0 1px rgba(	10, 10, 10,.02)"
										: "0 .75em 1.5em -.185em rgba(	0, 0, 0,1), 0 0 1px rgba(	0, 0, 0,.0)",
								"&:focus-within": {
									"& a": {
										outline: "none"
									}
								}
							}}
						>
							<PostPreview {...post} spotlight />
						</Paper>
					);
				})}
			</Box>

			<Typography
				component="h2"
				color="primary"
				variant="h5"
				fontWeight="700"
				sx={{ mb: { xs: 1, sm: 2, md: 4, lg: 5 }, mt: 8 }}
			>
				Posts
			</Typography>
			<Container
				sx={{
					mt: -6,
					display: "grid",
					gridTemplateColumns: { md: "1fr 380px" },
					columnGap: 8
				}}
			>
				<Box>
					<Box component="ul" sx={{ p: 0, m: 0 }}>
						{displayedPosts.map(post => (
							<Box
								component="li"
								key={post.id}
								sx={() => ({
									py: 2.5,
									display: "flex",
									flexDirection: "column",
									position: "relative",
									"&:not(:last-of-type)": {
										borderBottom: "1px solid",
										borderColor: "divider"
									}
								})}
							>
								<PostPreview {...post} />
							</Box>
						))}
					</Box>
					{totalPage > 1 && (
						<Pagination
							page={page + 1}
							count={totalPage}
							shape="rounded"
							showFirstButton
							showLastButton
							onChange={(_, value) => {
								setPage(value - 1);
							}}
							sx={{
								mt: 1,
								mb: 8,
								"& .MuiPaginationItem-root": {
									color: "#fff"
								},
								"& .MuiPaginationItem-text": {
									color: theme.palette.primary.main
								},
								"& .Mui-selected": {
									backgroundColor: theme.palette.gsb.primary,
									color: "#FFFFFF"
								}
							}}
						/>
					)}
				</Box>
			</Container>
		</Container>
	);
};

export default PostList;
