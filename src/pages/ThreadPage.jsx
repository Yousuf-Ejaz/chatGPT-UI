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
		<div className="flex h-screen bg-slate-300 ">
			<Sidebar />
			<div className="flex flex-col justify-start grow  ">
				<Navbar />
				<div className=" m-2 mt-0 rounded-b-md bg-white flex flex-col justify-start  overflow-x-auto grow ">
					<div className="flex flex-col gap-3 max-w-[650px] px-8 mx-auto  ">
						{chats &&
							chats.map((chat) => (
								<div key={chat.id}>
									<Question>{chat.query}</Question>
									<Answer>
										{chat.response ? (
											chat.response
										) : (
											<SkeletonLoader />
										)}
									</Answer>
								</div>
							))}

						{/* <Question>Who wrote Brothers Karamazov</Question>
						<Answer>
							"The Brothers Karamazov" is a Russian novel written
							by Fyodor Dostoevsky 2 . Dostoevsky spent nearly two
							years working on the novel, which was published as a
							serial in The Russian Messenger from January 1879 to
							November 1880 1 . The story revolves around the
							lives of three Russian brothers who are very
							different in body, mind, and spirit, and are often
							thought of as representing those three parts of
							mankind 2 . The novel is known for its deep
							exploration of human psychology, philosophy, and
							morality, and has been acclaimed as one of the
							supreme achievements in world literature 1 .
						</Answer>
						<Question>
							what other works did dostoevsky write
						</Question>
						<Answer>
							Fyodor Dostoevsky, a renowned Russian writer, is
							known for several significant works, including:
							Crime and Punishment (1866): This novel focuses on
							the mental anguish and moral dilemmas of an
							impoverished man who kills an old pawnbroker and her
							sister 4 . The Idiot (1869): This novel portrays the
							moral and intellectual journey of Prince Lev
							Nikolayevich Myshkin, a young and good-hearted man,
							and explores the complexities of human nature 2 .
							Demons (1872): Also known as "The Possessed," this
							novel delves into the psychological and moral
							struggles of a group of revolutionaries in 1860s
							Russia 2 . The Brothers Karamazov (1880): This novel
							revolves around the lives of three Russian brothers
							and is known for its deep exploration of human
							psychology, philosophy, and morality 2 . In addition
							to these, Dostoevsky's body of work consists of
							thirteen novels, three novellas, seventeen short
							stories, and numerous other works 2 . His writings
							have had a profound influence on literary modernism,
							existentialism, and various schools of psychology,
							theology, and literary criticism 3 .
						</Answer> */}
					</div>
					<form
						onSubmit={submitHandler}
						className="absolute -translate-x-1/2   left-1/2  bottom-0 mb-20 md:mb-6 lg:w-[700px]  md:w-[500px] w-full px-8 md:px-0 min-w-md"
					>
						<input
							type="text"
							placeholder="Ask follow-up..."
							ref={inputQuery}
							className=" rounded-3xl pl-4 md:ml-28 py-3 pr-10 w-full focus:border-gray-500 border-2 border-gray-300 focus:border-2 focus:outline-none "
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
