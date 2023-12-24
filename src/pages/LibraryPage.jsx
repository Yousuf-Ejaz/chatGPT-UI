import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import LibraryHeader from "../components/LibraryHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ThreadIcon from "../Icons/ThreadIcon";
import { useEffect, useRef, useState } from "react";
import Popup from "../components/Popup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../Icons/RightArrowIcon";

function LibraryPage() {
	const threads = useSelector((state) => state.threads);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const navigate = useNavigate();
	const inputQuery = useRef(null);
	const dispatch = useDispatch();

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				closePopup();
			}
		};

		const handleBackgroundClick = (event) => {
			if (event.target.classList.contains("popup-background")) {
				closePopup();
			}
		};

		// Attach event listeners when the component mounts
		if (isPopupOpen) {
			window.addEventListener("keydown", handleKeyDown);
			window.addEventListener("click", handleBackgroundClick);
		}

		// Detach event listeners when the component unmounts
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("click", handleBackgroundClick);
		};
	}, [isPopupOpen, closePopup]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createChat(inputQuery.current.value));
		const newThreadId = crypto.randomUUID();

		dispatch(addNewThread(newThreadId, inputQuery.current.value));
		inputQuery.current.value = "";
		closePopup();

		navigate(`/search/${newThreadId}`);
	};

	return (
		<div className="flex h-screen bg-[#f3f3ee] ">
			<Sidebar currLocation="library" openPopup={setIsPopupOpen} />
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
			<Popup isOpen={isPopupOpen}>
				<div className="md:w-96  bg-[#fcfcf9] rounded-md">
					<form
						className="p-2 rounded-md border-[1px] shadow-sm border-[#9e9e8f] relative "
						onSubmit={submitHandler}
					>
						<input
							type="text"
							className="w-full bg-[#fcfcf9] focus:outline-none focus:ring-0 px-2 py-2.5 text-[#64645f] "
							placeholder="Ask anything..."
							ref={inputQuery}
						/>
						<div
							className="flex flex-col justify-center rounded-full hover:bg-violet-800 bg-violet-950 absolute top-1/2 -translate-y-1/2 right-3  cursor-pointer transform w-fit text-gray-400 p-2"
							onClick={submitHandler}
						>
							<RightArrowIcon />
						</div>
					</form>
				</div>
			</Popup>
		</div>
	);
}

export default LibraryPage;
