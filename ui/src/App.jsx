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

import { Header, SideBar, AllPosts } from "#Components";
import { ColorModeContext, UserContext } from "#Context";
import { Landing, Login, SignUp, PageNotFound } from "#Pages";
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
								<Route
									path="/user"
									element={
										!user.isLoggedIn ? (
											<Navigate to="/login" replace={true} />
										) : (
											<Outlet />
										)
									}
								>
									<Route
										path="posts"
										element={
											!user.isLoggedIn ? (
												<Navigate to="/login" replace={true} />
											) : (
												<AllPosts />
											)
										}
									/>
									<Route path="post/:id" element={<></>} />
								</Route>
								<Route
									path="/"
									element={
										user.isLoggedIn ? (
											<Navigate to="/user" replace={true} />
										) : (
											<Landing />
										)
									}
								/>
								<Route
									path="/login"
									element={
										user.isLoggedIn ? (
											<Navigate to="/user" replace={true} />
										) : (
											<Login />
										)
									}
								/>
								<Route
									path="/signup"
									element={
										user.isLoggedIn ? (
											<Navigate to="/user" replace={true} />
										) : (
											<SignUp />
										)
									}
								/>
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						</Box>
					</Box>
				</ThemeProvider>
			</UserContext.Provider>
		</ColorModeContext.Provider>
	);
}

export default App;
