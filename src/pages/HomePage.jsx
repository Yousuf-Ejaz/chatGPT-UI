import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../Icons/RightArrowIcon";
import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { createChat } from "../actions/chatActions";
import { addNewThread } from "../actions/threadActions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Popup from "../components/Popup";

function HomePage() {
	const navigate = useNavigate();
	const inputQuery = useRef(null);
	const dispatch = useDispatch();

	const [isPopupOpen, setIsPopupOpen] = useState(false);

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
		<div className="flex h-screen w-screen bg-[#f3f3ee]">
			<Sidebar currLocation="home" openPopup={setIsPopupOpen} />
			<div className="grow m-2 rounded-md  flex flex-col md:justify-center justify-between bg-[#fcfcf9]">
				<div className="md:hidden">
					<Navbar />
				</div>
				<div className=" flex flex-col gap-8 mx-auto justify-center">
					<div>
						<img
							src="/Logo.png"
							alt="LongShot logo"
							className="mx-auto w-20 h-20 shadow rounded-full border"
						/>
					</div>
					<div className="text-center font-bold text-2xl font-['Syne'] text-violet-950">
						How can I help you today?
					</div>
					<form className="relative" onSubmit={submitHandler}>
						<input
							type="text"
							ref={inputQuery}
							placeholder="Ask anything..."
							className="rounded-md pl-4 py-3 pr-10 w-80 md:w-96 focus:border-gray-500 border-2 border-gray-300 focus:border-2 focus:outline-none "
						/>
						<div
							className="flex flex-col justify-center rounded-full hover:bg-slate-200 absolute top-1/2 md:right-2 right-8 cursor-pointer transform -translate-y-1/2 hover:text-gray-500  text-gray-400 p-2"
							onClick={submitHandler}
						>
							<RightArrowIcon />
						</div>
					</form>
				</div>
				<Footer currLocation="home" />
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
export default HomePage;
