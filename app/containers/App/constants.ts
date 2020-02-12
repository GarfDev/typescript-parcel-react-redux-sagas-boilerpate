/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

enum ActionTypes {
  LOAD_SESSION = 'App/LOAD_SESSION',
  LOAD_SESSION_SUCCESS = 'App/LOAD_SESSION_SUCCESS',
  LOAD_SESSION_FAILED = 'App/LOAD_SESSION_FAILED',
}

export default ActionTypes;