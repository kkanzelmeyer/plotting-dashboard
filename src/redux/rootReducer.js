import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import dataModule from './modules/log-data';

export default combineReducers({
  data: dataModule,
  router
});
