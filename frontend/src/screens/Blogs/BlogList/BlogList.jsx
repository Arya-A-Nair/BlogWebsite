import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { url } from "../../../constants/baseUrl";
import axios from "axios";
import getCommonOptions from "../../../helpers/getCommonOptions";

const BlogList = () => {
	let ext = "blogs/getBlogList/";
	const [data, setData] = useState([]);
	const [searchParams] = useSearchParams();
	console.log(searchParams.get("top"));
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
	return <div>BlogList</div>;
};

export default BlogList;
