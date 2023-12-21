import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "../Icons/SearchIcon";
import StackIcon from "../Icons/StackIcon";
import ThreadIcon from "../Icons/ThreadIcon";

function Sidebar({ currLocation }) {
	const threads = useSelector((state) => state.threads);

	return (
		<div className="w-56 bg-[#f3f3ee] py-5 px-4  flex-col gap-2 md:flex hidden text-[#64645f]">
			<Link
				to="/"
				className="mt-2 mb-4 text-[#64645f] font-semibold rounded-3xl py-2 px-4 bg-white border-1 border-[#eaeae4] cursor-pointer  shadow hover:ring-2 hover:ring-violet-800 text-center"
			>
				New Thread
			</Link>
			<Link
				to="/"
				className={`pl-2 font-medium  cursor-pointer  hover:bg-[#e8e8e3] hover:text-violet-950 rounded-md py-2 px-4 flex gap-2 justify-start  ${
					currLocation === "home" ? "text-violet-950" : ""
				}`}
			>
				<div className={`flex flex-col justify-center`}>
					<SearchIcon />
				</div>
				<div>Home</div>
			</Link>
			<Link
				to="/library"
				className={`pl-2 font-medium  cursor-pointer  hover:bg-[#e8e8e3] hover:text-violet-950 rounded-md py-2 px-4 flex gap-2 justify-start  ${
					currLocation === "library" ? "text-violet-950" : ""
				}`}
			>
				<div className="flex flex-col justify-center w-5 h-5">
					<StackIcon />
				</div>
				<div>Library</div>
			</Link>
			<div className="pl-2 font-medium  cursor-pointer   rounded-md flex flex-col gap-2">
				<div className=" text-sm pl-4 font-normal border-l border-l-gray-400 flex flex-col gap-1">
					{threads.map((thread) => (
						<Link
							to={`/search/${thread.id}`}
							key={thread.id}
							className="hover:bg-[#e8e8e3] hover:text-[#64645f] text-transparent rounded py-1 px-2  flex justify-between"
						>
							<div className="text-[#64645f]">
								{thread.chats[0].query.slice(0, 16)}
								{thread.chats[0].query.length >= 16
									? "..."
									: ""}
							</div>
							<div className="flex-col justify-center  flex w-3 h-3 my-auto">
								<ThreadIcon />
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
export default Sidebar;
