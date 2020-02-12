import { Reducer, Store } from "redux"
import { RouterState } from "connected-react-router"
import { Saga } from "redux-saga"

import { ContainerState as AppState } from '../containers/App/type';

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

export interface ApplicationRootState {
  readonly router: RouterState;
  readonly global: AppState;
  // for testing purposes
  readonly test: any;
}