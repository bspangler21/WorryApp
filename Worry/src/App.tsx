import "./App.css";
import Footer from "./pageComponents/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header";
import Worries from "./pages/worry/Worries";
import About from "./pages/About";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/worry" Component={Worries}></Route>
				<Route path="/about" Component={About}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
export default App;
