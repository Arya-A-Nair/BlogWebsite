import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
const navlinks = [
	{
		path: "/",
		name: "Home",
		icon: <HomeIcon />,
	},
	{
		path: "/addBlog",
		name: "Add Blog",
		icon: <AddIcon />,
	},
	{
		path: "/blogs",
		name: "All Blogs",
		icon: <LocalLibraryIcon />,
	},
];

const Navbar = () => {
	const [isMobile, setIsMobile] = useState(null);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 500) {
				setIsMobile(false);
			} else {
				setIsMobile(true);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const location = useLocation();
	console.log(location.pathname);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	return (
		<div className={styles.container}>
			{/* <div className={styles.navbar}>
				<h1
					style={{
						cursor: "grab",
					}}
					onClick={() => navigate("/")}
				>
					BlogChain
				</h1>
				<div className={styles.navlinksContainer}>
					{navlinks.map((item) => {
						console.log(location.pathname === item.path);
						return (
							<div
								onClick={() => navigate(item.path)}
								className={styles.navlink}
								style={
									location.pathname === item.path
										? { boxShadow: "1rem 1rem var(--fontColor) " }
										: {}
								}
							>
								{item.icon} {item.name}
							</div>
						);
					})}
				</div>
			</div> */}
			<div
				className={styles.mobileNav}
				style={{
					width: open ? (isMobile ? "85%" : "25%") : "0%",
				}}
			>
				<div className={styles.text}>
					<h1
						style={{
							cursor: "grab",
							fontSize: isMobile ? "1.5rem" : "1.8rem",
						}}
						onClick={() => navigate("/")}
					>
						BlogChain
					</h1>
					<CloseIcon onClick={() => setOpen(!open)} />
				</div>
				<div className={styles.navlinksContainer}>
					{navlinks.map((item) => {
						console.log(location.pathname === item.path);
						return (
							<div
								onClick={() => navigate(item.path)}
								className={styles.navlink}
								style={
									location.pathname === item.path
										? { boxShadow: "0rem 0.25rem var(--fontColor) " }
										: {}
								}
							>
								{item.icon} {item.name}
							</div>
						);
					})}
				</div>
			</div>
			<div
				style={{
					width: "100%",
					overflowY: "scroll",
					margin: "1rem",
					scrollbarColor: "transparent",
				}}
			>
				<div className={styles.tempNav}>
					<MenuIcon onClick={() => setOpen(true)} />
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Navbar;
