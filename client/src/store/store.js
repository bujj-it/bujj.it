import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from 'reducers';

const composeMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    return compose(applyMiddleware(createLogger()));
  }
};

const fetchPersistedState = () => {
  try {
    const persistedState = localStorage.getItem('reduxState')
    return !!persistedState ? JSON.parse(persistedState) : {}
  } catch(err) {
    console.error('Error fetching application state:', err)
    return {}
  }
}

const saveState = () => {
  try {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  } catch(err) {
    console.error('Error saving application state:', err)
  }
}

const persistedState = fetchPersistedState()

const store = createStore(reducers, persistedState, compose(composeMiddleware()));

store.subscribe(saveState)

export default store;
