import { CHATSTREAM_ADD_CHAT } from "../constants/chatStreamConstants";

export const addNewChat = (threadId, query) => async (dispatch, getState) => {
	const newChat = {
		id: crypto.randomUUID(),
		timeStamp: Date.now(),
		query: query,
		response: null,
	};

	dispatch({
		type: CHATSTREAM_ADD_CHAT,
		payload: { threadId, newChat },
	});

	localStorage.setItem("threads", JSON.stringify(getState().threads));
};
