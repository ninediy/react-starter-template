export const logger = store => next => action => {
  if (process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT') {
    console.group(action.type);
    console.log('current state', store.getState());
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
  } else {
    return next(action);
  }
};
