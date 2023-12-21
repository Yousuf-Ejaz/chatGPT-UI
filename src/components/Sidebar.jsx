import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
	const threads = useSelector((state) => state.threads);
	
	return (
		<div className="w-56 bg-slate-300 py-5 px-4  flex-col gap-2 md:flex hidden">
			<Link
				to="/"
				className="my-4 text-gray-700 font-semibold rounded-3xl py-2 px-4 bg-white border-2 border-transparent cursor-pointer hover:border-2 hover:border-gray-500"
			>
				New Thread
			</Link>
			<Link
				to="/"
				className="pl-2 font-medium  cursor-pointer  hover:bg-slate-400 rounded-md py-2 px-4"
			>
				Home
			</Link>
			<Link
				to="/library"
				className="pl-2 font-medium  cursor-pointer  hover:bg-slate-400 rounded-md py-2 px-4"
			>
				Library
			</Link>
			<div className="pl-2 font-medium  cursor-pointer   rounded-md py-2 px-4 flex flex-col gap-2">
				<div className=" text-sm pl-4 font-normal border-l border-l-gray-400 flex flex-col gap-1">
					{threads.map((thread) => (
						<Link
							to={`/search/${thread.id}`}
							key={thread.id}
							className="hover:bg-slate-400 rounded py-1 px-2  "
						>
							{thread.chats[0].query.slice(0, 18)}
							{thread.chats[0].query.length >= 18 ? "..." : ""}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
export default Sidebar;
