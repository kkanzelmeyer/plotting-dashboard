import { fromJS } from 'immutable';

export const SET_CALL = 'SET_CALL';
export const SET_CALLS = 'SET_CALLS';

export const setCall = ({ key, data }) => ({
  type: SET_CALL,
  payload: {
    key,
    data
  }
});

export const setCalls = (payload) => ({
  type: SET_CALLS,
  payload
});

const callReducer = (state, { payload: { key, data } }) => state.set(key, fromJS(data));
const callsReducer = (state = fromJS({}), { payload }) => state.mergeDeep(fromJS(payload));

export default (state = fromJS({}), action) => {
  switch (action.type) {
    case SET_CALL:
      return callReducer(state, action);
    case SET_CALLS:
      return callsReducer(state, action);
  }
  return state;
};
