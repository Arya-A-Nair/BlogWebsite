import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { url } from "../../../constants/baseUrl";
import axios from "axios";
import getCommonOptions from "../../../helpers/getCommonOptions";
import styles from "./BlogList.module.css";
import BlogListItem from "./BlogListItem";
import { Box, Pagination } from "@mui/material";

const BlogList = () => {
	let ext = "blogs/getBlogList/";
	const [data, setData] = useState([]);
	const [searchParams] = useSearchParams();
	// console.log(searchParams.get("top"));
	useEffect(() => {
		const getData = async () => {
			axios
				.get(`${url}${ext}`, getCommonOptions())
				.then((res) => {
					setData(res.data);
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		};
		getData();
	}, []);
	const handleChange = async (e, p) => {
		console.log(p);
		axios
			.get(`${url}${ext}?page=${p}`, getCommonOptions())
			.then((res) => {
				setData(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className={styles.container}>
			<div className={styles.pageTitle}>BlogList</div>
			<div className={styles.container2}>
				{data?.results?.map((item) => {
					return (
						<div
							style={{
								width: "1fr",
							}}
						>
							<BlogListItem item={item} alt={true} />
						</div>
					);
				})}
			</div>
			<div className={styles.pagination}>
				<Pagination
					count={data?.count }
					color="primary"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default BlogList;
