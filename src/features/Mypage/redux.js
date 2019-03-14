import fetch from 'cross-fetch';

const SET_USERNAME = 'SET_USERNAME';

const GET_POST = 'GET_POST';
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_FULFILLED = 'GET_POST_FULFILLED';
const GET_POST_REJECTED = 'GET_POST_REJECTED';

const initialState = {
  username: '',
  loading: false,
  posts: [],
  error: false
};

export const MypageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.value };
    case GET_POST_PENDING:
      return { ...state, loading: true };
    case GET_POST_FULFILLED:
      return { ...state, loading: false, error: false, posts: action.payload };
    case GET_POST_REJECTED:
      return { ...state, loading: false, posts: [], error: true };
    default:
      return state;
  }
};

export const setUsername = value => ({
  type: SET_USERNAME,
  value: value
});

export const getPosts = () => ({
  type: GET_POST,
  payload: fetch('https://jsonplaceholder.typicode.com/posts').then(
    response => response.json(),
    error => {
      console.log('API Error: ', error);
      return error;
    }
  )
});
