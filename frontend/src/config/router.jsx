import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/Authentication/Login";
import Register from "../screens/Authentication/Register";
import BlogDetails from "../screens/Blogs/BlogDetails/BlogDetails";
import BlogList from "../screens/Blogs/BlogList/BlogList";
import Home from "../screens/Home/Home";
import AddBlogScreen from "../screens/AddBlogScreen/AddBlogScreen";
import Navbar from "../components/Navbar/Navbar";

const router = createBrowserRouter([
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{ path: "/", element: <Home /> },
	{
		path: "/",
		element: <Navbar />,
		children: [
			{ path: "/blogs/:blogId", element: <BlogDetails /> },
			{ path: "/blogs", element: <BlogList /> },
			{ path: "/addBlog", element: <AddBlogScreen /> },
		],
	},
]);

export default router;
