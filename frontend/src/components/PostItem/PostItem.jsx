import React from "react";
import styles from "./PostItem.module.css";

import { url } from "../../constants/baseUrl";
import { useNavigate } from "react-router-dom";
const PostItem = ({ item }) => {
	console.log(item);
	const navigate=useNavigate()
	return (
		<div className={styles.container} onClick={()=>navigate(`/blogs/${item.id}`)} >
			<img src={`${url}${item.image}`} />
			<div className={styles.title}>{item.title}</div>
			<div className={styles.author}>{item.authorName} </div>
			<div className={styles.description}>{item.description} </div>
			<div className={styles.description}>Views:{item.views} </div>
			<div className={styles.categoryContainer}>
				{item.category.map((x) => (
					<div className={styles.category}>{x.name}</div>
				))}
			</div>
		</div>
	);
};

export default PostItem;
