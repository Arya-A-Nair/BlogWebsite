import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../../constants/baseUrl";
import getCommonOptions from "../../../helpers/getCommonOptions";
import ReactMarkdown from "react-markdown";
import styles from "./BlogDetails.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";
const BlogDetails = () => {
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

	let { blogId } = useParams();
	const [data, setData] = useState({});
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

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
				<CircularProgress color="primary" determinate={false} size="lg" />
			</div>
		);
	}
	const handleDonate = () => {
		let account;
		window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
			account = res[0];
			window.ethereum
				.request({
					method: "eth_sendTransaction",
					params: [
						{
							from: account,
							to: "0x91B1b9CfeC94411863A2390d0a0aB3Dd1e6d0199",
							value: "0x10a2241af62c0000",
							gasPrice: "0x09184e72a000",
							gas: "0x2710",
						},
					],
				})
				.then((txHash) => console.log(txHash))
				.catch((error) => console.error(error));
		});
	};

	return (
		<div className={styles.container}>
			<img
				src={
					data.image != null
						? `${url}${data.image}`
						: "https://picsum.photos/200"
				}
				className={styles.image}
			/>
			<div
				style={{
					marginTop: "1rem",
				}}
			>
				<div className={styles.title}>{data.title}</div>
				<div className={styles.author}>Author- {data.authorName}</div>
			</div>
			<div
				className={styles.content}
				style={{
					padding: isMobile ? "2rem" : "3rem 5rem",
				}}
			>
				<ReactMarkdown>{data.content}</ReactMarkdown>
			</div>
			<div
				className={styles.categoryContainer}
				style={{
					flexDirection: isMobile ? "column" : "row",
					alignItems: "flex-start",
				}}
			>
				<span
					style={{
						fontSize: "1.2rem",
						paddingLeft: "0.25rem",
					}}
				>
					Category-
				</span>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "0.5rem",
					}}
				>
					{data?.category?.map((x) => (
						<div
							onClick={() => navigate(`/blogs?category=${x.name}`)}
							className={styles.category}
						>
							{x.name}
						</div>
					))}
				</div>
			</div>
			<div className={styles.creatorSupport} style={{
					flexDirection: isMobile ? "column" : "row",
					alignItems: isMobile ?  "flex-start" : "center",
				}}>
				<h1>Hey do you like the content Creator? Now you can support{" "}
				{data.authorName} by donating Matic. 
				<span className={styles.button} onClick={() => handleDonate()}>Donate</span>	
				</h1>
			</div>
		</div>
	);
};

export default BlogDetails;
