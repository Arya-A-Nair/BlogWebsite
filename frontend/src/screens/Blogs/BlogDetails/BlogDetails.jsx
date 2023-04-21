import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../../constants/baseUrl";
import getCommonOptions from "../../../helpers/getCommonOptions";
import ReactMarkdown from "react-markdown";
import styles from "./BlogDetails.module.css";
import CircularProgress from "@mui/material/CircularProgress";
const BlogDetails = () => {
	let { blogId } = useParams();
	const [data, setData] = useState({});
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			axios
				.post(
					`${url}blogs/getDetailBlog/`,
					{
						blog_id: blogId,
					},
					getCommonOptions()
				)
				.then((res) => {
					setLoading(false);

					setData(res.data);
				})
				.catch(() =>
					enqueueSnackbar("Internal Server Error", { variant: "error" })
				);
		};
		getData();
	}, []);
	useEffect(() => {
		console.log(data.category);
	}, [data]);

	if (loading) {
		return (
			<div className={styles.loader}>
				{/* hellloo */}
				<CircularProgress color="primary" determinate={false} size="lg" />
			</div>
		);
	} 

	return (
		<div className={styles.container}>
			<img src={`${url}${data.image}`} className={styles.image} />
			<div
				style={{
					marginTop: "1rem",
				}}
			>
				<div className={styles.title}>{data.title}</div>
				<div className={styles.author}>Author- {data.authorName}</div>
			</div>
			<div className={styles.content}>
				<ReactMarkdown>{data.content}</ReactMarkdown>
			</div>
			<div className={styles.categoryContainer}>
				<span
					style={{
						fontSize: "1.2rem",
					}}
				>
					Category-
				</span>
				{data?.category?.map((x) => (
					<div className={styles.category}>{x.name}</div>
				))}
			</div>
			<div className={styles.creatorSupport}>
				Hey do you like the content Creator? Now you can support{" "}
				{data.authorName} by donating Matic
			</div>
		</div>
	);
};

export default BlogDetails;
