import { fetch } from 'cross-fetch';

const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
const SET_LOGIN_URL = 'SET_LOGIN_URL';
const SET_LOGOUT_URL = 'SET_LOGOUT_URL';
const JWT = {
  GET_JWT: 'GET_JWT',
  GET_JWT_PENDING: 'GET_JWT_PENDING',
  GET_JWT_FULFILLED: 'GET_JWT_FULFILLED',
  GET_JWT_REJECTED: 'GET_JWT_REJECTED'
};

const initialState = {
  jwtToken: null,
  loading: false,
  error: false,
  loginUrl: null,
  logoutUrl: null
};

export const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return { ...state, jwtToken: action.value };
    case JWT.GET_JWT_PENDING:
      return { ...state, loading: true };
    case JWT.GET_JWT_FULFILLED:
      return { ...state, jwtToken: action.payload, loading: false };
    case JWT.GET_JWT_REJECTED:
      return {
        ...state,
        error: true,
        jwtToken: action.payload,
        loading: false
      };
    case SET_LOGIN_URL:
      return { ...state, loginUrl: action.value };
    case SET_LOGOUT_URL:
      return { ...state, logoutUrl: action.value };
    default:
      return state;
  }
};

export const setJwtToken = value => ({
  type: SET_JWT_TOKEN,
  value
});

export const setLoginUrl = value => ({
  type: SET_LOGIN_URL,
  value
});

export const setLogoutUrl = value => ({
  type: SET_LOGOUT_URL,
  value
});

export const getJwtToken = data => {
  const url = `${process.env.REACT_APP_API_SERVER_HOST +
    process.env.REACT_APP_API_AUTH}?access_token=${data.oauthCookie}&sTicket=${
    data.sTicketCookie
  }`;
  return {
    type: JWT.GET_JWT,
    payload: fetch(url).then(
      response => {
        const result = response.json();
        if (result && result.status === true) {
          if (result.data.token !== '') {
            return result.data.token;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
      error => console.log('Error API : ', error)
    )
  };
};
