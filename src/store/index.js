import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from '../reducers'

const store= createStore(rootReducer,composeWithDevTools(
    applyMiddleware(thunk)
) );
// const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;