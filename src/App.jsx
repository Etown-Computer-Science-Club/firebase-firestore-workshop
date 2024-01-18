import React from "react";
import "./App.css";
import ToDos from "./components/ToDos";

const App = () => {
	return (
		<div className="app">
			<header className="app-header">
				<h1>TaskMaster</h1>
			</header>
			<main>
				<ToDos />
			</main>
		</div>
	);
};

export default App;
