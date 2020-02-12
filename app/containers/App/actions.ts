import { action } from "typesafe-actions";

import ActionTypes from "./constants";

// ActionMaker
export const loadSession = () => action(ActionTypes.LOAD_SESSION);

export const sessionLoadSuccess = (payload) =>
  action(ActionTypes.LOAD_SESSION_SUCCESS, {
    accessToken: payload.accessToken,
    resetToken: payload.resetToken,
    userInfo: payload.userInfo,
  });

export const sessionLoadFailure = (payload) =>
  action(ActionTypes.LOAD_SESSION_FAILED, payload.error);

