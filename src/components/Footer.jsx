import { Link } from "react-router-dom";
import SearchIcon from "../Icons/SearchIcon";
import StackIcon from "../Icons/StackIcon";

function Footer({ currLocation }) {
	return (
		<div className="    bg-[#fcfcf9] flex justify-between md:hidden border-t  text-[#64645f] hover:text-violet-950 ">
			<Link
				to="/"
				className={`grow text-center font-medium flex flex-col gap-0.5 py-3 hover:bg-[#e8e8e3] pl-5 ${
					currLocation === "home"
						? "border-t-4 border-[#64645f] text-violet-950"
						: "border-t-4 border-transparent"
				}`}
			>
				<div className="mx-auto">
					<SearchIcon />
				</div>

				<div>Search</div>
			</Link>
			<Link
				to="/library"
				className={`grow text-center font-medium flex flex-col gap-0.5 py-3 hover:bg-[#e8e8e3] pr-5 ${
					currLocation === "library"
						? "border-t-4 border-[#64645f] text-violet-950"
						: "border-t-4 border-transparent"
				}`}
			>
				<div className="mx-auto w-5 h-5">
					<StackIcon />
				</div>
				<div>Library</div>
			</Link>
		</div>
	);
}
export default Footer;
