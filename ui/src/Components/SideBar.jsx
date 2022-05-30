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
	ListItemText,
	ListSubheader
} from "@mui/material";

import {
	Home as HomeIcon,
	Explore as ExploreIcon,
	AddCircle as AddCircleIcon
} from "@mui/icons-material";

import { UserContext } from "#Context";
import { useLocation, NavLink as RouterLink } from "react-router-dom";

const drawerWidth = 240;

const ListItemLink = props => {
	const { icon, primary, theme, to } = props;
	const location = useLocation();
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
				selected={location.pathname === to}
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
		path: "/user/posts",
		text: "Home"
	},
	{
		icon: <ExploreIcon />,
		path: "/posts",
		text: "Explore Blogs"
	}
];

const SideBar = () => {
	const theme = useTheme();

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
				{user.isLoggedIn && (
					<>
						<ListSubheader
							component="div"
							id="sidebar-navigation-subheader"
							sx={{
								pl: "4rem",
								color: theme.palette.primary.main,
								fontSize: "1.125rem",
								fontWeight: "bold"
							}}
						>
							Navigation
						</ListSubheader>
						{SideBarItems.map(item => (
							<List key={item.text} disablePadding>
								<ListItemLink
									icon={item.icon}
									primary={item.text}
									to={item.path}
									theme={theme}
								/>
							</List>
						))}
						<ListSubheader
							component="div"
							id="sidebar-navigation-subheader"
							sx={{
								pl: "4rem",
								color: theme.palette.primary.main,
								fontSize: "1.125rem",
								fontWeight: "bold"
							}}
						>
							Actions
						</ListSubheader>
						<List disablePadding>
							<ListItemLink
								icon={<AddCircleIcon />}
								primary={"New Post"}
								to="/user/post/new"
								theme={theme}
							/>
						</List>
					</>
				)}
			</Box>
		</Drawer>
	);
};

export default SideBar;
