import "./App.css";
import Footer from "./pageComponents/Footer";
import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./pageComponents/Header";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes></Routes>
			<Footer />
		</BrowserRouter>
	);
}
export default App;
