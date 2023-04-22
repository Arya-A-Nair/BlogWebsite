import React from "react";
import styles from "./BlogListItem.module.css";

import { url } from "../../../constants/baseUrl";
import { useNavigate } from "react-router-dom";
const PostItem = ({ item, alt = false }) => {
	const navigate = useNavigate();
	return (
		<div
			className={styles.container2}
			onClick={() => navigate(`/blogs/${item.id}`)}
		>
			<div>
				<img
					src={
						item.image != null
							? `${url}${item.image}`
							: "https://picsum.photos/200"
					}
				/>
				<div>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.author}>{item.authorName} </div>
					<div className={styles.description}>{item.description} </div>
					<div className={styles.categoryContainer}>
						{item.category.map((x) => (
							<div className={styles.category2}>{x.name}</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.description}>Views:{item.views} </div>
		</div>
	);
};

export default PostItem;
