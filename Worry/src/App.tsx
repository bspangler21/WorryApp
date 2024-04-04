import "./App.css";
import Footer from "./pageComponents/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header";
import Worries from "./pages/worry/Worries";
import About from "./pages/About";
import AddWorry from "./pages/worry/AddWorry";
import EditWorry from "./pages/worry/EditWorry";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/worry" Component={Worries}></Route>
				<Route path="/about" Component={About}></Route>
				<Route path="/add-worry" Component={AddWorry}></Route>
				<Route path="/worry/edit/:id" Component={EditWorry}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
export default App;
