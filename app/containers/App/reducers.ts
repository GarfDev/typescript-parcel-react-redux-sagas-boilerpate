import { ContainerState, ContainerActions } from './type'
import ActionType from './constants';

export const initialState: ContainerState = {
  isLoading: false,
  isAuthorized: false,
}

function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions
): ContainerState {
  switch (action.type) {
    case ActionType.LOAD_SESSION:
      return {
        isLoading: true,
        isAuthorized: false,
      }
    case ActionType.LOAD_SESSION_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        isLoading: false,
        sessionToken: action.payload.accessToken,
      }
    case ActionType.LOAD_SESSION_FAILED:
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default appReducer;