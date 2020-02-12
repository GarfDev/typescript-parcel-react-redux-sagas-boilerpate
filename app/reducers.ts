import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import globalReducer from './containers/App/reducers';

import history from './utils/history'

export default function createReducer(injectedReducer = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    ...injectedReducer,
  });
  return rootReducer
}