import { fromJS } from 'immutable';
import Action from '../action';

export const type = {
  SET_DATA: 'SET_DATA',
  CLEAR_DATA: 'CLEAR_DATA'
};

export const loadData = (file) => {
  return new Action(
    type.SET_DATA,
    file
  );
};

export default (state = fromJS({}), action) => {
  switch (action.type) {

    case type.SET_DATA:
      return state.set('data', fromJS(action.payload));

    case type.CLEAR_DATA:
      return state.set('data', fromJS({}));

    default:
      return state;
  }
};
