import { useEffect, useRef } from "react";
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

	return (
		<div className="flex h-screen bg-[#f3f3ee]">
			<Sidebar />
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
		</div>
	);
}

export default ThreadPage;
