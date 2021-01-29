import { combineReducers } from 'redux';
import navMenu from './navMenuReducer';
import budgetFlow from './budgetFlowReducer'; 
import savingGoal from './savingGoalReducer'

export default combineReducers({
  navMenu,
  budgetFlow,
  savingGoal
});
