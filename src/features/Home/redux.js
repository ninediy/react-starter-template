import fetch from 'cross-fetch';

const SET_APP_NAME = 'SET_NAME';
const POST = {
  GET_POST: 'GET_POST',
  GET_POST_PENDING: 'GET_POST_PENDING',
  GET_POST_FULFILLED: 'GET_POST_FULFILLED',
  GET_POST_REJECTED: 'GET_POST_REJECTED'
};

const initialState = {
  name: 'Garena',
  posts: [],
  loading: false,
  error: null
};

export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_NAME:
      return { ...state, name: action.value };
    case POST.GET_POST_PENDING:
      return { ...state, loading: true };
    case POST.GET_POST_FULFILLED:
      return { ...state, posts: action.payload, loading: false };
    case POST.GET_POST_REJECTED:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const setAppName = value => ({
  type: SET_APP_NAME,
  value
});

export const getPosts = () => ({
  type: POST.GET_POST,
  payload: fetch('https://jsonplaceholder.typicode.com/posts').then(
    response => response.json(),
    error => console.log('Error API : ', error)
  )
});
