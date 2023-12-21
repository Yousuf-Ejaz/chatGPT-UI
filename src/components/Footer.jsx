import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="  px-5 py-3 bg-white flex justify-between md:hidden border-t border-t-gray-400">
			<Link to="/" className="grow text-center font-medium ">
				Search
			</Link>
			<Link to="/library" className="grow text-center font-medium">
				Library
			</Link>
		</div>
	);
}
export default Footer;
