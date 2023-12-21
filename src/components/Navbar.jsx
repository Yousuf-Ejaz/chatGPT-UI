import { useDispatch } from "react-redux";
import { resetThreads } from "../actions/threadActions";
import { useNavigate } from "react-router-dom";
import ResetIcon from "../Icons/ResetIcon";

function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const resetHandler = (e) => {
		e.preventDefault();
		dispatch(resetThreads());
		navigate("/");
	};

	return (
		<div className="  px-5 py-3 bg-[#fcfcf9] mt-2 rounded-t-md mx-2 flex justify-between border-b">
			<div className="flex gap-3 ">
				<img
					src="/Logo.png"
					alt="LongShot logo"
					className="mx-auto w-10 h-10"
				/>
				<div className="font-bold text-3xl tracking-tighter text-violet-950 ">
					LongShot AI.
				</div>
			</div>
			<button
				className="bg-violet-950 hover:bg-violet-800  text-white rounded-md py-2 px-4 flex gap-2"
				onClick={resetHandler}
			>
				<div className="flex flex-col justify-center w-5 h-5">
					<ResetIcon />
				</div>
				<div>Reset</div>
			</button>
		</div>
	);
}
export default Navbar;
