import { combineReducers } from 'redux';
import navMenu from './navMenuReducer';
import budgetFlow from './budgetFlowReducer';
import savingGoal from './savingGoalReducer';
import income from './incomeReducer';
import expenses from './expensesReducer';
import savingPercentage from './savingPercentageReducer';
import toggleSavingPercentage from './toggleSavingPercentageReducer';
import dashboardSection from './dashboardSectionReducer';

export default combineReducers({
  navMenu,
  budgetFlow,
  savingGoal,
  income,
  expenses,
  savingPercentage,
  toggleSavingPercentage,
  dashboardSection,
});
