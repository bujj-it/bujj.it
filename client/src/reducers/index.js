import { combineReducers } from 'redux';
import navMenu from './navMenuReducer';
import budgetFlow from './budgetFlowReducer'; 
import savingGoal from './savingGoalReducer'
import income from './incomeReducer'

export default combineReducers({
  navMenu,
  budgetFlow,
  savingGoal,
  income
});
