import { fromJS } from 'immutable';
import Action from '../action';

/**
 * Enums for action types
 * @type {Object}
 */
export const type = {
  SET_DATA: 'SET_DATA',
  CLEAR_DATA: 'CLEAR_DATA'
};

/**
 * Action to add data to the state
 * @param  {[data]} data The data to add
 */
export const addData = (data) => {
  console.debug('Adding data');
  return new Action(
    type.SET_DATA,
    data
  ).toObject();
};

/**
 * Action to clear the data from the state
 */
export const clearData = () => {
  console.debug('Clearing data');
  return new Action(
    type.CLEAR_DATA,
    []
  ).toObject();
};

/**
 * Reducer for handling data actions
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 */
const dataReducer = (data, action) => {
  switch (action.type) {

    case type.SET_DATA:
    case type.CLEAR_DATA:
      return fromJS(action.payload);

    default:
      return data;
  }
};

/**
 * Data Module combined reducer
 * @param  {[obj]} state  = {} Default state
 * @param  {[obj]} action redux action
 * @return {[obj]} the new data state
 */
const dataModule = (state = {}, action) => {
  return {
    data: dataReducer(state.data, action)
  };
};

export default dataModule;
