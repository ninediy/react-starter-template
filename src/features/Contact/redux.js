const SET_CONTACT_LOCATION = 'SET_CONTACT_LOCATION';

const initialState = {
  contact_location: null
};

export const ContactReducer = (state = initialState, { type, value }) => {
  switch (type) {
    case SET_CONTACT_LOCATION:
      return { ...state, contact_location: value };

    default:
      return state;
  }
};

export const setContactLocation = value => ({
  type: SET_CONTACT_LOCATION,
  value
});
