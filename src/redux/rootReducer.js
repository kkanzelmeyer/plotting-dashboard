import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import dataModule from './modules/log-data';
import trackIdModule from './modules/track-ids';

export default combineReducers({
  data: dataModule,
  trackIds: trackIdModule,
  router
});
