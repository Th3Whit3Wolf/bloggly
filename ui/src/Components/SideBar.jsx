import { useContext, useState } from "react";
import {
	Box,
	Toolbar,
	useTheme,
	styled,
	Drawer as MuiDrawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from "@mui/material";

import { Message as MessageIcon } from "@mui/icons-material";

import { UserContext } from "#Context";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme)
	})
}));

const openedMixin = thm => ({
	boxSizing: "border-box",
	width: drawerWidth,
	transition: thm.transitions.create("width", {
		easing: thm.transitions.easing.sharp,
		duration: thm.transitions.duration.enteringScreen
	}),
	overflowX: "hidden"
});

const closedMixin = thm => ({
	transition: thm.transitions.create("width", {
		easing: thm.transitions.easing.sharp,
		duration: thm.transitions.duration.leavingScreen
	}),
	overflowX: "hidden",
	width: `calc(${thm.spacing(7)} + 1px)`,
	[thm.breakpoints.up("sm")]: {
		width: `calc(${thm.spacing(8)} + 1px)`
	}
});

const SideBarItems = [
	{
		icon: <MessageIcon />,
		path: "/blogs",
		text: "My Blogs"
	}
];

const SideBar = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	const { user } = useContext(UserContext);
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		if (!open) {
			setOpen(true);
		}
	};

	const handleDrawerClose = () => {
		if (open) {
			setOpen(false);
		}
	};

	const handleListOnClick = (e, path) => {
		e.preventDefault();
		console.log(
			`handleListOnClick (${location} === ${path}) ${location === path}`
		);
		if (location !== path) {
			console.log(`Navigating to ${path}`);
			//navigate(path);
		}
	};

	return (
		<Drawer
			variant="permanent"
			open={open}
			onMouseEnter={handleDrawerOpen}
			onMouseLeave={handleDrawerClose}
			sx={{
				display: user.isLoggedIn ? "block" : "none"
			}}
		>
			<Toolbar />
			<Toolbar />
			<Box sx={{ overflow: "hidden" }}>
				{user.isLoggedIn &&
					SideBarItems.map(item => (
						<List key={item.text} disablePadding>
							<ListItemButton
								data-testid={`SideBar List Item ${item.text}`}
								selected={location === item.path}
								onClick={e => handleListOnClick(e, item.path)}
								sx={{
									"&.Mui-selected": {
										backgroundColor: theme.palette.selected
									},
									"&.MuiListItemButton-root:hover": {
										backgroundColor: theme.palette.hover.list
									}
								}}
							>
								<ListItemIcon sx={{ color: theme.palette.gsb.primary }}>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.text}
									sx={{ color: theme.palette.gsb.primary }}
								/>
							</ListItemButton>
						</List>
					))}
			</Box>
		</Drawer>
	);
};

export default SideBar;
