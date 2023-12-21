import {
	CHAT_CREATE_FAIL,
	CHAT_CREATE_REQUEST,
	CHAT_CREATE_SUCCESS,
} from "../constants/chatConstants";

export const chatCreateReducer = (state = { chat: [] }, action) => {
	switch (action.type) {
		case CHAT_CREATE_REQUEST:
			return { loading: true, chat: [] };
		case CHAT_CREATE_SUCCESS:
			return { loading: false, chat: action.payload };
		case CHAT_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
