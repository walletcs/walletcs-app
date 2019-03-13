// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { driveReducer } from './drive';
import { accountReducer } from './account';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    drive: driveReducer,
    account: accountReducer
  });
}
