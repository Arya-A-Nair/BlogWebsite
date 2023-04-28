import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function App() {
	return (
		<>
			<SnackbarProvider>
				<RouterProvider router={router}></RouterProvider>
			</SnackbarProvider>
		</>
	);
}

export default App;
