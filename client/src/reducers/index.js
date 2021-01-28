import { combineReducers } from 'redux';
import navMenu from './navMenuReducer';
import budgetFlow from './budgetFlowReducer'; 

export default combineReducers({
  navMenu,
  budgetFlow
});
