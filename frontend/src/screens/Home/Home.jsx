import React from "react";
import RecentPosts from "../../components/RecentPosts/RecentPosts";
import TopPosts from '../../components/TopPosts/TopPosts'
import styles from "./Home.module.css";

const Home = () => {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<div>
					<img src="/assets/ethereum.png" />
				</div>
				<div>
					<h1>Making Blogging profitable with Blockchain</h1>
				</div>
			</section>
			<RecentPosts />
			<TopPosts />
		</div>
	);
};

export default Home;
