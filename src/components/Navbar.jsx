import { useDispatch } from "react-redux";
import { resetThreads } from "../actions/threadActions";

function Navbar() {
	const dispatch = useDispatch();
	const resetHandler = (e) => {
		e.preventDefault();
		dispatch(resetThreads());
	};

	return (
		<div className="  px-5 py-3 bg-white mt-2 rounded-t-md mx-2 flex justify-between">
			<div className="font-bold text-3xl tracking-tighter ">
				LongShot AI.
			</div>
			<button
				className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-700"
				onClick={resetHandler}
			>
				Reset
			</button>
		</div>
	);
}
export default Navbar;
