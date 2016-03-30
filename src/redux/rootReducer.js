import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import calls from './modules/calls';
import partners, * as partnerActions from './modules/partners';
import data from './modules/log-data.js';
import undoable from 'redux-undo';

export default combineReducers({
  calls,
  partners: undoable(partners, {
    undoType: partnerActions.UNDO_UPDATE_PARTNER,
    redoType: partnerActions.REDO_UPDATE_PARTNER,
    jumpToPastType: partnerActions.RESET_PARTNER_CHANGES,
    clearHistoryType: partnerActions.CLEAR_PARTNER_CHANGES,
    initActions: [partnerActions.SET_PARTNERS]
  }),
  data,
  router
});
