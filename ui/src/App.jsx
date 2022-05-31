import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import {
	Box,
	Toolbar,
	createTheme,
	CssBaseline,
	ThemeProvider,
	useMediaQuery
} from "@mui/material";

import { Header, SideBar } from "#Components";
import { ColorModeContext, UserContext } from "#Context";
import {
	AllPosts,
	CreatePost,
	Landing,
	Login,
	SignUp,
	PageNotFound,
	UserPosts,
	Post
} from "#Pages";
import getDesignTokens from "./theme.js";

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
	const [user, setUser] = useState({ isLoggedIn: false });
	const colorMode = useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
			}
		}),
		[]
	);
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
	const usr = useMemo(() => ({ user, setUser }), [user]);

	const LogInOr = Component => {
		if (user.isLoggedIn) {
			return <Component />;
		} else {
			return <Navigate to="/login" replace={true} />;
		}
	};

	const UserOr = Component => {
		if (user.isLoggedIn) {
			return <Navigate to="/user/posts" replace={true} />;
		} else {
			return <Component />;
		}
	};

	return (
		<ColorModeContext.Provider value={colorMode}>
			<UserContext.Provider value={usr}>
				<ThemeProvider theme={theme}>
					<Box sx={{ display: "flex" }}>
						<CssBaseline />
						<Header />
						<SideBar />
						<Box component="main" sx={{ flexGrow: 1, p: 0 }}>
							<Toolbar />
							<Toolbar />
							<Routes>
								<Route path="*" element={<PageNotFound />} />
								<Route path="/" element={UserOr(Landing)} />
								<Route path="/login" element={UserOr(Login)} />
								<Route path="/posts" element={<AllPosts />} />
								<Route path="/post/:id" element={<Post />} />
								<Route path="/signup" element={UserOr(SignUp)} />
								<Route path="/user" element={LogInOr(Outlet)}>
									<Route path="posts" element={LogInOr(UserPosts)} />
									<Route path="post/new" element={<CreatePost />} />
									<Route path="post/:id" element={LogInOr(Post)} />
								</Route>
							</Routes>
							<Toolbar />
						</Box>
					</Box>
				</ThemeProvider>
			</UserContext.Provider>
		</ColorModeContext.Provider>
	);
}

export default App;
