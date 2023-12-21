import axios from "axios";
import {
	THREADS_ADD_CHATSTREAM,
	THREADS_RESET,
	THREADS_UPDATE_CHATSTREAM,
} from "../constants/threadConstants";

export const addNewThread = (threadId, query) => async (dispatch, getState) => {
	const newThread = {
		id: threadId,
		chats: [
			{
				id: crypto.randomUUID(),
				timeStamp: Date.now(),
				query: query,
				response: null,
			},
		],
	};
	dispatch({ type: THREADS_ADD_CHATSTREAM, payload: newThread });

	localStorage.setItem("threads", JSON.stringify(getState().threads));
};
export const updateThreadById =
	(threadId, response) => async (dispatch, getState) => {
		const { threads } = getState();
		const { chats } = threads.find((thread) => thread.id === threadId);
		const chatId = chats[chats.length - 1].id;

		dispatch({
			type: THREADS_UPDATE_CHATSTREAM,
			payload: { threadId, chatId, response },
		});

		localStorage.setItem("threads", JSON.stringify(getState().threads));
	};
export const resetThreads = () => async (dispatch) => {
	dispatch({
		type: THREADS_RESET,
	});

	localStorage.setItem("threads", JSON.stringify([]));
};
