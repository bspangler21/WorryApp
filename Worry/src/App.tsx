import "./App.css";
import Footer from "./pageComponents/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header";
import Worries from "./pages/worry/Worries";
import About from "./pages/About";
import AddWorry from "./pages/worry/AddWorry";
import EditWorry from "./pages/worry/EditWorry";
import ListCardLayout from "./pages/ListCardLayout";
import Handicap from "./pages/Handicap";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/worry" Component={Worries}></Route>
				<Route path="/about" Component={About}></Route>
				<Route path="/add-worry" Component={AddWorry}></Route>
				<Route path="/worry/edit/:id" Component={EditWorry}></Route>
				<Route path="/authenticate" Component={Worries}></Route>
				<Route path="/cards" Component={ListCardLayout}></Route>
				<Route path="/handicap" Component={Handicap}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
export default App;
