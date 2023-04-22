import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { url } from "../../../constants/baseUrl";
import axios from "axios";
import getCommonOptions from "../../../helpers/getCommonOptions";
import styles from "./BlogList.module.css";
import BlogListItem from "./BlogListItem";
import { Box, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BlogList = () => {
	let ext = "blogs/getBlogList/";
	const [data, setData] = useState([]);
	const [orginialData, setOriginalData] = useState([]);
	const [searchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState("");
	const [searchCondition, setSearchCondition] = useState("title");
	// console.log(searchParams.get("top"));
	useEffect(() => {
		const getData = async () => {
			axios
				.get(`${url}${ext}`, getCommonOptions())
				.then((res) => {
					setData(res.data?.results);
					setOriginalData(res.data);
				})
				.catch((err) => console.log(err));
		};
		getData();
	}, []);
	const handleChange = async (e, p) => {
		axios
			.get(`${url}${ext}?page=${p}`, getCommonOptions())
			.then((res) => {
				setData(res.data?.results);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (searchValue == "") return;
		let tempData = [];
		if (searchCondition == "title") {
			orginialData.results?.forEach((item) => {
				if (item.title.includes(searchValue)) {
					tempData.push(item);
				}
			});
		}
		if (searchCondition == "description") {
			orginialData.results?.forEach((item) => {
				if (item.description.includes(searchValue)) {
					tempData.push(item);
				}
			});
		}
		if (searchCondition == "category") {
			orginialData.results?.forEach((item) => {
				for (let i = 0; i < item.category.length; i++) {
					if (item.category[i].name?.includes(searchValue)) {
						tempData.push(item);
					}
				}
				if (item.description.includes(searchValue)) {
					tempData.push(item);
				}
			});
		}

		setData(tempData);
	}, [searchValue, searchCondition]);

	return (
		<div className={styles.container}>
			<div className={styles.pageTitle}>BlogList</div>
			<div className={styles.helperContainer}>
				<SearchIcon />
				<input
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<select
					value={searchCondition}
					onChange={(e) => setSearchCondition(e.target.value)}
				>
					<option value="title">Title</option>
					<option value="category">Category</option>
					<option value="description">Description</option>
				</select>
			</div>
			<div className={styles.container2}>
				{data?.map((item) => {
					return (
						<div
							key={item.id}
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
					count={orginialData?.count}
					color="primary"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default BlogList;
