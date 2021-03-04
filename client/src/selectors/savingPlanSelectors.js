import { DAYS_PER_MONTH, WEEKS_PER_MONTH } from 'constants/time.constants';
import { totalExpensesPerMonthSelector } from './expensesSelectors';

export const remainingPerMonthSelector = state => {
  return state.income - totalExpensesPerMonthSelector(state);
};

export const savingsPerMonthSelector = (state, savingPercentage = state.savingPercentage) => {
  return Math.trunc(state.income * (savingPercentage / 100));
};

export const spendingPerMonthSelector = (state, savingPercentage = state.savingPercentage) => {
  return remainingPerMonthSelector(state) - savingsPerMonthSelector(state, savingPercentage);
};

export const spendingPerWeekSelector = (state, savingPercentage = state.savingPercentage) => {
  const remainingMonies = spendingPerMonthSelector(state, savingPercentage);
  return Math.trunc((remainingMonies) / WEEKS_PER_MONTH);
};

export const timeToGoalSelector = (state, savingPercentage = state.savingPercentage) => {
  const savingsPerMonth = savingsPerMonthSelector(state, savingPercentage);
  if (savingsPerMonth <= 0) {
    return { months: 0, days: 0 };
  }
  const remainingTime = state.savingGoal.value / savingsPerMonth;
  const months = Math.floor(remainingTime);
  const days = Math.round(DAYS_PER_MONTH * (remainingTime - months));
  return { months, days };
};

export const maxSavingPercentageSelector = state => {
  return Math.floor((remainingPerMonthSelector(state) / state.income) * 100);
};

export const defaultCustomSavingPercentageSelector = state => {
  const maxSavingPercentage = maxSavingPercentageSelector(state);
  return maxSavingPercentage === 0 ? 0 : Math.floor(maxSavingPercentage / 2);
};

export const sliderSavingPercentageSelector = state => {
  if (state.savingPercentage === null) {
    return defaultCustomSavingPercentageSelector(state);
  }
  return maxSavingPercentageSelector(state) === 0 ? 0 : state.savingPercentage;
};
