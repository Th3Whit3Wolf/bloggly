import { forwardRef, useContext, useState, useMemo } from "react";
import {
	Box,
	Toolbar,
	useTheme,
	styled,
	Drawer as MuiDrawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@mui/material";

import { Message as MessageIcon, Home as HomeIcon } from "@mui/icons-material";

import { UserContext } from "#Context";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

const ListItemLink = props => {
	const { icon, primary, theme, to } = props;

	const renderLink = useMemo(
		() =>
			forwardRef(function Link(itemProps, ref) {
				return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
			}),
		[to]
	);

	return (
		<li>
			<ListItem
				button
				component={renderLink}
				sx={{
					"&.Mui-selected": {
						backgroundColor: theme.palette.selected
					},
					"&.MuiListItem-root:hover": {
						backgroundColor: theme.palette.hover.list
					}
				}}
			>
				{icon ? (
					<ListItemIcon sx={{ color: theme.palette.gsb.primary }}>
						{icon}
					</ListItemIcon>
				) : null}
				<ListItemText
					primary={primary}
					sx={{ color: theme.palette.gsb.primary }}
				/>
			</ListItem>
		</li>
	);
};

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
		icon: <HomeIcon />,
		path: "/user",
		text: "Home"
	},
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
							<ListItemLink
								icon={item.icon}
								primary={item.text}
								to={item.path}
								theme={theme}
							/>
						</List>
					))}
			</Box>
		</Drawer>
	);
};

export default SideBar;
