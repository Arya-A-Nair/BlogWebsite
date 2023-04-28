import { useSnackbar } from "notistack";
import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { url } from "../../constants/baseUrl";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		let flag = false;
		if (username.trim().length === 0) {
			flag = true;
			enqueueSnackbar("Check Username", { variant: "error" });
		}
		if (password.trim().length === 0) {
			flag = true;
			enqueueSnackbar("Check Password", { variant: "error" });
		}
		if (flag) return;
		try {
			let response = await axios.post(`${url}/api/auth/token/login`, {
				username: username,
				password: password,
			});
			console.log(response);
			localStorage.setItem("authToken", response.data.auth_token);
			enqueueSnackbar("Login successful", { variant: "success" });
			navigate("/");
		} catch {
			enqueueSnackbar("Incorrect credentials", { variant: "error" });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.container2}>
				<img src="assets/userIcon.jpg" />

				<h6>Login</h6>
				<div className={styles.inputContainer}>
					<label>Username</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></input>
					<label>Password</label>
					<input
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default Login;
