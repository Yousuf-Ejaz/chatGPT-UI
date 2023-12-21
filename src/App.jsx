import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThreadPage from "./pages/ThreadPage";
import LibraryPage from "./pages/LibraryPage";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/search/:id" element={<ThreadPage />} />
				<Route path="/library" element={<LibraryPage />} />
			</Routes>
		</Router>
	);
}
export default App;
