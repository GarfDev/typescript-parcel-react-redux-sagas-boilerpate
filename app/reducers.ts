import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from './utils/history'

export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...injectedReducer,
  });
  return rootReducer
}