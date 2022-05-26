import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

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
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route
								path="/login"
								element={
									<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
										<Toolbar />
										<Toolbar />
										<Login />
									</Box>
								}
							/>
							<Route
								path="/signup"
								element={
									<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
										<Toolbar />
										<Toolbar />
										<SignUp />
									</Box>
								}
							/>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</Box>
				</ThemeProvider>
			</UserContext.Provider>
		</ColorModeContext.Provider>
	);
}

export default App;
