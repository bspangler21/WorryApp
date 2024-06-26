import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme, ThemeProvider } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import { DefaultButton } from "@fluentui/react";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		backgroundColor: `#2b14d9`,
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const navLinks = [
	{ path: "/worry", name: "Worries" },
	{ path: "/about", name: "About" },
];

const Header = () => {
	const theme = useTheme();
	const nav = useNavigate();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<ThemeProvider theme={theme}>
				<AppBar position="relative" open={open}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>
						{window.location.href.indexOf("worry") > -1 &&
							window.location.href.indexOf("add-worry") ===
								-1 && (
								<>
									<span style={{ width: "80%" }}></span>

									<DefaultButton
										primary={true}
										style={{
											width: "200px",
											backgroundColor: "#FFFFFF",
											color: "#2b14d9",
										}}
										onClick={() => nav("/add-worry")}
									>
										Add New
									</DefaultButton>
								</>
							)}
					</Toolbar>
				</AppBar>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					variant="persistent"
					anchor="left"
					open={open}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<List>
						{navLinks.map((navLink) => (
							<ListItem key={navLink.name}>
								<ListItemButton
									onClick={() => {
										nav(navLink.path);
										setOpen(false);
									}}
								>
									<ListItemText primary={navLink.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
			</ThemeProvider>
		</div>
	);
};

export default Header;
