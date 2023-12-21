import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../Icons/RightArrowIcon";
import Sidebar from "../components/Sidebar";
import { useRef } from "react";
import { createChat } from "../actions/chatActions";
import { addNewThread } from "../actions/threadActions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
	const navigate = useNavigate();
	const inputQuery = useRef(null);
	const dispatch = useDispatch();

	const submitHandler = async () => {
		dispatch(createChat(inputQuery.current.value));
		const newThreadId = crypto.randomUUID();

		dispatch(addNewThread(newThreadId, inputQuery.current.value));

		navigate(`/search/${newThreadId}`);
	};
	return (
		<div className="flex h-screen w-screen bg-slate-300">
			<Sidebar />
			<div className="grow m-2 rounded-md bg-white flex flex-col md:justify-center justify-between">
				<div className="md:hidden">
					<Navbar />
				</div>
				<div className=" flex flex-col gap-8 mx-auto justify-center">
					<div>
						<img src="/Logo.png" alt="LongShot logo"  className="mx-auto w-20 h-20 shadow rounded-full border"/>
					</div>
					<div className="text-center font-bold text-2xl ">
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
							className="flex flex-col justify-center rounded-full hover:bg-slate-200 absolute top-1/2 right-2 cursor-pointer transform -translate-y-1/2 hover:text-gray-500  text-gray-400 p-2"
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
export default HomePage;
