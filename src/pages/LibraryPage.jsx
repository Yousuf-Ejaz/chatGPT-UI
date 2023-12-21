import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import LibraryHeader from "../components/LibraryHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function LibraryPage() {
	const threads = useSelector((state) => state.threads);
	return (
		<div className="flex h-screen bg-slate-300 ">
			<Sidebar />
			<div className="flex flex-col justify-start grow  ">
				<LibraryHeader />
				<div className=" m-2 mt-0 rounded-b-md bg-white flex flex-col justify-start  overflow-x-auto grow ">
					<div className="flex flex-col gap-3 max-w-[650px] px-8 mx-auto ]">
						<h1 className="text-2xl font-semibold w-full py-4 border-b">
							Threads
						</h1>
						{threads.map((thread) => (
							<Link
								to={`/search/${thread.id}`}
								key={thread.id}
								className=" rounded py-1 px-2 pb-4 border-b "
							>
								<div className="font-semibold">
									{thread.chats[0].query.slice(0, 100)}
									{thread.chats[0].query.length >= 100
										? "..."
										: ""}
								</div>
								<div className="font-semibold text-gray-500">
									{thread.chats[0].response.slice(0, 140)}
									{thread.chats[0].response.length >= 140
										? "..."
										: ""}
								</div>
							</Link>
						))}
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default LibraryPage;
