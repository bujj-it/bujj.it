import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger'
import reducers from 'reducers';
import { STATE_TTL } from 'constants/app.constants'

const composeMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    return compose(applyMiddleware(createLogger()))
  }
};

const fetchPersistedState = () => {
  try {
    const localStateString = localStorage.getItem('reduxState')
    if (!!localStateString) {
      const localState = JSON.parse(localStateString)
      if ((new Date()).getTime() > localState.expiry) {
        localStorage.removeItem('reduxState')
      } else {
        return localState.state
      }
    }
  } catch(err) {
    console.error('Error fetching application state:', err)
  }
}

const saveState = () => {
  try {
    const localState = {
      state: store.getState(),
      expiry: (new Date()).getTime() + STATE_TTL
    }
    localStorage.setItem('reduxState', JSON.stringify(localState))
  } catch(err) {
    console.error('Error saving application state:', err)
  }
}

const persistedState = fetchPersistedState()

const store = createStore(reducers, persistedState, compose(composeMiddleware()));

store.subscribe(saveState)

export { store }