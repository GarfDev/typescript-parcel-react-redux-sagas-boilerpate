import { createSelector } from 'reselect';
import { ApplicationRootState } from '../../types/';

const selectGlobal = (state: ApplicationRootState) => {
  return state.global
}

const selectRoute = (state: ApplicationRootState) => {
  return state.router
}

