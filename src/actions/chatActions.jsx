import {
	CHAT_CREATE_FAIL,
	CHAT_CREATE_REQUEST,
	CHAT_CREATE_SUCCESS,
} from "../constants/chatConstants";
import axios from "axios";

export const createChat = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: CHAT_CREATE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					import.meta.env.VITE_LONGSHOT_API_KEY
				}`,
			},
		};

		const { data } = await axios.post(
			"https://api-v2.longshot.ai/custom/api/generate/instruct",
			{
				text: searchQuery,
			},
			config
		);

		dispatch({ type: CHAT_CREATE_SUCCESS, payload: data });

		console.log(data);
	} catch (error) {
		dispatch({
			type: CHAT_CREATE_FAIL,
			payload: error.message,
		});
		console.log(error);
	}
};
