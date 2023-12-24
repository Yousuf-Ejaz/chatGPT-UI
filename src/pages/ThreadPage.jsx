import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightArrowIcon from "../Icons/RightArrowIcon";
import Answer from "../components/Answer";
import Navbar from "../components/Navbar";
import Question from "../components/Question";
import Sidebar from "../components/Sidebar";
import { updateThreadById } from "../actions/threadActions";
import { addNewChat } from "../actions/chatStreamActions";
import { useParams } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";
import { createChat } from "../actions/chatActions";
import Footer from "../components/Footer";
import AnswerIcon from "../Icons/AnswerIcon";
import Popup from "../components/Popup";
import { useNavigate } from "react-router-dom";

function ThreadPage() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const inputQuery = useRef(null);
	const newChat = useSelector((state) => state.chatCreate);

	const { loading, error, chat } = newChat;
	useEffect(() => {
		if (chat && chat.copies && chat.copies[0].content) {
			const response = chat.copies[0].content;
			dispatch(updateThreadById(id, response));
		}
	}, [chat]);

	const thread = useSelector((state) => state.threads).find(
		(thread) => thread.id === id
	);
	const { chats } = thread;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createChat(inputQuery.current.value));
		dispatch(addNewChat(id, inputQuery.current.value));
		inputQuery.current.value = "";
	};
	const navigate = useNavigate();
	const inputPopupQuery = useRef(null);


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

	const submitPopupHandler = (e) => {
		e.preventDefault();
		dispatch(createChat(inputQuery.current.value));
		const newThreadId = crypto.randomUUID();

		dispatch(addNewThread(newThreadId, inputQuery.current.value));
		inputQuery.current.value = "";
		closePopup();

		navigate(`/search/${newThreadId}`);
	};

	return (
		<div className="flex h-screen bg-[#f3f3ee]">
			<Sidebar openPopup={setIsPopupOpen} />
			<div className="flex flex-col justify-start grow bg-[#f3f3ee]  ">
				<Navbar />
				<div className=" m-2 mt-0 rounded-b-md bg-[#fcfcf9] flex flex-col justify-start  overflow-x-auto grow ">
					<div className="flex flex-col gap-3 max-w-[650px] px-8 mx-auto  ">
						{chats &&
							chats.map((chat) => (
								<div key={chat.id}>
									<Question>{chat.query}</Question>
									<div className="font-medium text-lg text-violet-950 mb-2 flex gap-3">
										<div className="flex flex-col justify-center w-5 h-5 my-auto">
											<AnswerIcon />
										</div>
										<div>Answer</div>
									</div>
									<Answer>
										{chat.response ? (
											chat.response
										) : (
											<SkeletonLoader />
										)}
									</Answer>
								</div>
							))}

						<div className="h-10"></div>
					</div>
					<form
						onSubmit={submitHandler}
						className="absolute -translate-x-1/2   left-1/2  bottom-0 mb-20 md:mb-6 lg:w-[700px]  md:w-[500px] w-full px-8 md:px-0 min-w-md"
					>
						<input
							type="text"
							placeholder="Ask follow-up..."
							ref={inputQuery}
							className=" rounded-3xl pl-4 md:ml-28 py-3 pr-10 w-full focus:border-gray-500 border-2 border-gray-300 focus:border-2 focus:outline-none ring-4 ring-[#eaeae4]"
						/>
						<div
							className="flex flex-col justify-center rounded-full hover:bg-slate-200 absolute top-1/2 md:-right-24 right-10 cursor-pointer transform -translate-y-1/2 hover:text-gray-500  text-gray-400 p-2"
							onClick={submitHandler}
						>
							<RightArrowIcon />
						</div>
					</form>
				</div>
				<Footer />
			</div>
			<Popup isOpen={isPopupOpen}>
				<div className="md:w-96  bg-[#fcfcf9] rounded-md">
					<form
						className="p-2 rounded-md border-[1px] shadow-sm border-[#9e9e8f] relative "
						onSubmit={submitPopupHandler}
					>
						<input
							type="text"
							className="w-full bg-[#fcfcf9] focus:outline-none focus:ring-0 px-2 py-2.5 text-[#64645f] "
							placeholder="Ask anything..."
							ref={inputPopupQuery}
						/>
						<div
							className="flex flex-col justify-center rounded-full hover:bg-violet-800 bg-violet-950 absolute top-1/2 -translate-y-1/2 right-3  cursor-pointer transform w-fit text-gray-400 p-2"
							onClick={submitPopupHandler}
						>
							<RightArrowIcon />
						</div>
					</form>
				</div>
			</Popup>
		</div>
	);
}

export default ThreadPage;
