import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./AddBlogScreen.module.css";
import { MenuItem, Select } from "@mui/material";
import { url } from "../../constants/baseUrl";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getCommonOptions from "../../helpers/getCommonOptions";

const AddBlogScreen = () => {
	const [markdown, setMarkdown] = useState("");
	const [title, setTitle] = useState("");
	const [categories, setCategories] = useState("");
	const [connected, setConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState("");
	const { enqueueSnackbar } = useSnackbar();
	const [image, setImage] = useState("");
	const navigate = useNavigate();
	const handleConnect = () => {
		window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
			setWalletAddress(res[0]);
			setConnected(true);
		});
	};
	const handleSubmit = async () => {
		const category = categories.split(", ");
		if (!markdown.length) {
			enqueueSnackbar("Enter something in content", { variant: "error" });
			return;
		}
		if (!category.length) {
			enqueueSnackbar("No category", { variant: "error" });
			return;
		}
		if (!title.length) {
			enqueueSnackbar("Enter title", { variant: "error" });
			return;
		}
		axios.post(
			`${url}blogs/addBlog/`,
			{
				title: title,
				description: markdown.slice(0, 10),
				content: markdown,
				category: category,
				image: image,
			},
			getCommonOptions()
		);
		enqueueSnackbar("Successfully Added", { variant: "success" });
		navigate("/");
	};
	return (
		<div className={styles.container}>
			<div className={styles.pageTitle}>Add Blog</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div className={styles.titleBox}>
					<h1>Blog Title</h1>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={styles.titleInput}
					/>
					<h1>Enter categories(add commas in between)</h1>
					<input
						value={categories}
						onChange={(e) => setCategories(e.target.value)}
						className={styles.titleInput}
					/>
					<h1>Add image Link</h1>
					<input
						value={image}
						onChange={(e) => setImage(e.target.value)}
						className={styles.titleInput}
					/>
				</div>
			</div>
			<div className={styles.container2}>
				<div className={styles.textAreaContainer}>
					<h1>Type your text here</h1>
					<textarea
						className={styles.textarea}
						value={markdown}
						onChange={(e) => setMarkdown(e.target.value)}
					/>
				</div>
				<div className={styles.textAreaContainer}>
					<h1>Output</h1>
					<div className={styles.textarea}>
						<ReactMarkdown>{markdown}</ReactMarkdown>
					</div>
				</div>
			</div>
			{/* <div className={} */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div className={styles.buttonGroup}>
					<button onClick={() => handleConnect()} className={styles.button}>
						{connected
							? "Wallet Address- " + walletAddress
							: "Click here to Connect Wallet"}
					</button>
					<button onClick={() => handleSubmit()} className={styles.button}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddBlogScreen;
