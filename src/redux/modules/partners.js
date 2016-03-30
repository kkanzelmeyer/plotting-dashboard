import {
  fromJS
} from 'immutable';

export const SET_PARTNER = 'SET_PARTNER';
export const SET_PARTNERS = 'SET_PARTNERS';
export const UPDATE_PARTNER = 'UPDATE_PARTNER';
export const SAVE_PARTNER = 'SAVE_PARTNER';
export const UNDO_UPDATE_PARTNER = 'UNDO_UPDATE_PARTNER';
export const REDO_UPDATE_PARTNER = 'REDO_UPDATE_PARTNER';
export const RESET_PARTNER_CHANGES = 'RESET_PARTNER_CHANGES';
export const CLEAR_PARTNER_CHANGES = 'CLEAR_PARTNER_CHANGES';

export const setPartner = ({
  key,
  data
}) => ({
  type: SET_PARTNER,
  payload: {
    key,
    data
  }
});

export const setPartners = (payload) => ({
  type: SET_PARTNERS,
  payload
});

export const updatePartner = (partner) => ({
  type: UPDATE_PARTNER,
  payload: {
    key: partner.get('id'),
    data: partner
  }
});

export const savePartner = (key) => ({
  type: SAVE_PARTNER,
  payload: {
    key
  }
});

export const resetPartnerChanges = () => ({
  type: RESET_PARTNER_CHANGES,
  index: 1
});

export const clearPartnerChanges = () => ({
  type: CLEAR_PARTNER_CHANGES
});

const partnerReducer = (state, {
  payload: {
    key,
    data
  }
}) => state.set(key, fromJS(data));

const partnersReducer = (state = fromJS({}), {
  payload
}) => state.mergeDeep(fromJS(payload));

export default (state = fromJS({}), action) => {
  switch (action.type) {
    case SET_PARTNER:
      return partnerReducer(state, action);
    case SET_PARTNERS:
      return partnersReducer(state, action);
    case UPDATE_PARTNER:
      return partnerReducer(state, action);
  }
  return state;
};
