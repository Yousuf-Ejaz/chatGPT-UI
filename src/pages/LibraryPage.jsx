import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import LibraryHeader from "../components/LibraryHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ThreadIcon from "../Icons/ThreadIcon";

function LibraryPage() {
	const threads = useSelector((state) => state.threads);
	return (
		<div className="flex h-screen bg-[#f3f3ee] ">
			<Sidebar currLocation="library"/>
			<div className="flex flex-col justify-start grow bg-[#f3f3ee]  ">
				<LibraryHeader />
				<div className=" m-2 mt-0 rounded-b-md bg-[#fcfcf9] flex flex-col justify-start  overflow-x-auto grow ">
					<div className="flex flex-col gap-3 max-w-[650px] px-8 mx-auto ]">
						<div className="text-xl font-semibold w-full py-4 border-b flex justify-start gap-2 mt-5 text-violet-950">
							<div className="flex flex-col justify-center w-5 h-5 my-auto">
								<ThreadIcon />
							</div>
							<div>Threads</div>
						</div>
						{threads.map((thread) => (
							<Link
								to={`/search/${thread.id}`}
								key={thread.id}
								className=" rounded py-1 px-2 pb-4 border-b text-violet-950  hover:text-violet-800 "
							>
								<div className="font-medium">
									{thread.chats[0].query.slice(0, 100)}
									{thread.chats[0].query.length >= 100
										? "..."
										: ""}
								</div>
								<div className=" text-[#64645f]">
									{thread.chats[0].response.slice(0, 140)}
									{thread.chats[0].response.length >= 140
										? "..."
										: ""}
								</div>
							</Link>
						))}
					</div>
				</div>
				<Footer currLocation="library" />
			</div>
		</div>
	);
}

export default LibraryPage;
