import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { ApplicationRootState } from "../../types/"

interface AppState {
  readonly isLoading: boolean;
  readonly isAuthorized: boolean;
  readonly error?: object | boolean;
  readonly sessionToken?: string;
  readonly userInfo?: any;
}

type AppActions = ActionType<typeof actions>

type RootState = ApplicationRootState;
type ContainerState = AppState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions }
