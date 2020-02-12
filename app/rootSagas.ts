import appSagas from './containers/App/sagas'
import { all, call } from "redux-saga/effects"

export default function* rootSagas() {
  return yield all([
    call(appSagas),
  ])
}


