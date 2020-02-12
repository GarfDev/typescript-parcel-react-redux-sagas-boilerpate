import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import ActionTypes from "./constants";
import * as actions from './actions';

function fetchLogin() {
  return axios({
    url: "https://api.myjson.com/bins/qfhzg",
    method: "GET",
  })
}

function* callLogin() {
  console.log("SAGA RANNNNN")
  const response = yield call(fetchLogin)
  if(response.statusTex === "OK"){
    const data = response.data
    yield put(actions.sessionLoadSuccess({
      sessionToken: data.sessionToken,
      resetToken: data.resetToken,
      userInfo: data.userInfo,
    }));  
  }
  yield put(actions.sessionLoadFailure({error: response.error}))
}

export default function* moduleSaga() {
  yield all([
    takeLatest(ActionTypes.LOAD_SESSION, callLogin)
  ])
};