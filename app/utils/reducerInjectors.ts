import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../reducers';
import { InjectedStore } from 'types';
import { Reducer, combineReducers } from 'redux';

function formInjectedReducers(injectedReducers: any) {
  const newInjectedReducers = {};
  for (const key in injectedReducers) {
    if (!injectedReducers.hasOwnProperty(key)) {
      continue;
    }
    newInjectedReducers[key] = combineInjectedReducers(injectedReducers[key]);
  }
  return newInjectedReducers;
}

function combineInjectedReducers(injectedReducers: any) {
  if (typeof injectedReducers !== 'object') {
    return injectedReducers;
  }
  const combinedReducerObject = {};
  for (const prop in injectedReducers) {
    if (!injectedReducers.hasOwnProperty(prop)) {
      continue;
    }
    const value = injectedReducers[prop];
    if (typeof value === 'object') {
      combinedReducerObject[prop] = combineInjectedReducers(value);
    } else if (typeof value === 'function') {
      combinedReducerObject[prop] = value;
    }
  }
  return combineReducers(combinedReducerObject);
}

function replaceInjectedReducers(
  rootReducers: any,
  keys: string[],
  reducer: Reducer<object>,
) {
  const key = keys.shift();
  if (!key) {
    return;
  }
  if (keys.length === 0) {
    rootReducers[key] = reducer;
    return;
  }
  if (rootReducers[key] === undefined) {
    rootReducers[key] = {};
  }
  return replaceInjectedReducers(rootReducers[key], keys, reducer);
}

export function injectReducerFactory(store: InjectedStore, isValid: boolean) {
  return function injectReducer(key: string, reducer: Reducer<object>) {
    if (!isValid) {
      checkStore(store);
    }

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // tslint:disable-next-line:max-line-length
    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    replaceInjectedReducers(store.injectedReducers, key.split('.'), reducer);
    const newInjectedReducers = formInjectedReducers(store.injectedReducers);
    store.replaceReducer(createReducer(newInjectedReducers));
  };
}

export default function getInjectors(store: InjectedStore) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
