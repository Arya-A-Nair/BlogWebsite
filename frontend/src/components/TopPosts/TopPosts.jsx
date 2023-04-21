import React, { useEffect, useState } from "react";
import styles from "./TopPosts.module.css";
import axios from "axios";
import { url } from "../../constants/baseUrl";
import getCommonOptions from "../../helpers/getCommonOptions";
import PostItem from "../PostItem/PostItem";
import { useNavigate } from "react-router-dom";

const TopPosts = () => {
	const [blogList, setBlogList] = useState([]);

	const navigate = useNavigate();
	useEffect(() => {
		const getBlogs = async () => {
			axios
				.get(`${url}blogs/getTopBlog`, getCommonOptions())
				.then((res) => {
					setBlogList(res.data);
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		};
		getBlogs();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.containerHeader}>
				<div>
					<h3>Top Posts</h3>
				</div>
				<div
					style={{
						textAlign: "right",
						textDecoration: "underline",
						cursor: "grab",
					}}
					onClick={() => {
						navigate("/blogs/?top=true");
					}}
				>
					See More
				</div>
			</div>
			<div className={styles.container2}>
				{blogList.map((item) => (
					<PostItem item={item} />
				))}
			</div>
		</div>
	);
};

export default TopPosts;
