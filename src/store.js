import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { chatCreateReducer } from "./reducers/chatReducers";
import { threadReducer } from "./reducers/threadReducers";

const reducer = combineReducers({
	chatCreate: chatCreateReducer,
	threads: threadReducer,
});

const threadsFromStorage = localStorage.getItem("threads")
	? JSON.parse(localStorage.getItem("threads"))
	: [];

const initialState = { threads: [...threadsFromStorage] };
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
