import { CHATSTREAM_ADD_CHAT } from "../constants/chatStreamConstants";
import {
	THREADS_ADD_CHATSTREAM,
	THREADS_RESET,
	THREADS_UPDATE_CHATSTREAM,
} from "../constants/threadConstants";

export const threadReducer = (state = { chatStreams: [] }, action) => {
	switch (action.type) {
		case THREADS_ADD_CHATSTREAM: {
			const newThread = action.payload;
			return [...state, newThread];
		}
		case THREADS_UPDATE_CHATSTREAM: {
			const { threadId, chatId, response } = action.payload;

			const updatedData = state.map((thread) => {
				if (thread.id === threadId) {
					const updatedThread = thread.chats.map((chat) => {
						if (chat.id === chatId) {
							return { ...chat, ["response"]: response };
						}
						return chat;
					});

					return { ...thread, chats: updatedThread };
				}
				return thread;
			});

			return updatedData;
		}
		case CHATSTREAM_ADD_CHAT: {
			const { threadId, newChat } = action.payload;
			const updatedData = state.map((thread) => {
				if (thread.id === threadId) {
					return { ...thread, chats: [...thread.chats, newChat] };
				}
				return thread;
			});

			return updatedData;
		}
		case THREADS_RESET: {
			return [];
		}
		default:
			return state;
	}
};
