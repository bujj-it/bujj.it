import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger'
import reducers from '../reducers';

const composeMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    return compose(applyMiddleware(createLogger()))
  }
};

const devData = {
  navMenu: null,
  budgetFlow: 'SAVING_PERCENTAGE',
  savingGoal: {
    name: "A holiday",
    value: "42000"
  },
  income: 10000,
  expenses: {
    '448b0760-6bca-11eb-849d-47442d1e7d47': {
      name: "Rent",
      value: 5000
    }
  }
}

const preloadData = process.env.NODE_ENV !== 'production' ? devData : {}

export const store = createStore(reducers, preloadData, compose(composeMiddleware()));



