import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import AddIcon from "@mui/icons-material/Add";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import HomeIcon from "@mui/icons-material/Home";

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
	const location = useLocation();
	console.log(location.pathname);
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<div className={styles.navbar}>
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
			</div>
			<div
				style={{
					width: "80%",
					overflowY: "scroll",
				}}
			>
				<Outlet />
			</div>
		</div>
	);
};

export default Navbar;
