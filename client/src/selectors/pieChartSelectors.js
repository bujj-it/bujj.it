import { totalExpensesPerMonthSelector } from 'selectors/expensesSelectors';
import { savingsPerMonthSelector, spendingPerMonthSelector } from './savingPlanSelectors';

export const mainPieChartDataSelector = state => [
  { name: 'Expenses', value: totalExpensesPerMonthSelector(state), fill: 'red' },
  { name: 'Spending', value: spendingPerMonthSelector(state), fill: 'green' },
  { name: 'Savings', value: savingsPerMonthSelector(state), fill: 'blue' },
];
