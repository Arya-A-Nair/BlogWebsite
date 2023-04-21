import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/Authentication/Login";
import Register from "../screens/Authentication/Register";
import BlogDetails from "../screens/Blogs/BlogDetails/BlogDetails";
import BlogList from "../screens/Blogs/BlogList/BlogList";
import Home from "../screens/Home/Home";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{ path: "/blogs/:blogId", element: <BlogDetails /> },
	{ path: "/blogs", element: <BlogList /> },
]);

export default router;
