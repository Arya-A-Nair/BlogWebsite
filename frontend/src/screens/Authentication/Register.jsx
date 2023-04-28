import { useSnackbar } from "notistack";
import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { url } from "../../constants/baseUrl";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const { enqueueSnackbar } = useSnackbar();
	const [walletAddress, setWalletAddress] = useState("");
	const [connected, setConnected] = useState(false);
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
		var emailRegex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
		if (email.match(emailRegex)) {
			flag = true;
			enqueueSnackbar("Check Email", { variant: "error" });
		}
		if (!connected) {
			flag = true;
			enqueueSnackbar("Wallet not connnected", { variant: "error" });
		}
		if (flag) return;
		// let response = await axios.post(`${url}/api/auth/users/`, {
		// 	username: username,
		// 	password: password,
		// 	email: email,
		// });
		// console.log(response);
		enqueueSnackbar("Register successful", { variant: "success" });
		navigate("/login");
	};

	const handleConnect = () => {
		window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
			setWalletAddress(res[0]);
			setConnected(true);
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.container2}>
				<img src="assets/userIcon.jpg" />

				<h6>Register</h6>
				<div className={styles.inputContainer}>
					<label>Username</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></input>
					<label>Email</label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
					></input>
					<label>Password</label>
					<input
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<button
					onClick={() => handleConnect()}
					style={{
						marginBottom: "1rem",
					}}
				>
					{connected
						? "Wallet Address- " + walletAddress
						: "Click here to Connect Wallet"}
				</button>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default Login;
