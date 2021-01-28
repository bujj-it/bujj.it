import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger'
import reducers from '../reducers';

const composeMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    return compose(applyMiddleware(createLogger()))
  }
};

export const store = createStore(reducers, compose(composeMiddleware()));
