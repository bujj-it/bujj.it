import React from "react";
import { connect } from 'react-redux';
import HomepageSection from "components/elements/HomepageSection";
import SectionNavigationButtons from 'components/composites/SectionNavigationButtons'
import { MoneyValue } from 'components/elements/MoneyValue'
import { DurationValue } from 'components/elements/DurationValue'
import Expense from 'components/elements/Expense';
import {
  savingsPerMonthSelector,
  spendingPerWeekSelector,
  timeToGoalSelector
} from 'selectors/savingPlanSelectors'
import {
  totalExpensesPerMonthSelector
} from 'selectors/expensesSelectors'
import { expensesSelector } from "selectors/expensesSelectors";

const currentBudgetFlowSection = 'DASHBOARD'

const mapStateToProps = state => {
  return {
    income: state.income,
    savingsPerMonth: savingsPerMonthSelector(state),
    spendingPerWeek: spendingPerWeekSelector(state),
    timeToGoal: timeToGoalSelector(state),
    totalExpensesPerMonth: totalExpensesPerMonthSelector(state),
    expenses: expensesSelector(state),
    savingGoal: state.savingGoal
  }
}

const Dashboard = props => {
  const expenseComponents = props.expenses.map(expense => {
    return (
      <>
        <span key={expense.id}>Name: {expense.name} Value: <MoneyValue value={expense.value} /></span>
        <br />
      </>
    )
  })

  return (
    <HomepageSection sectionClass='dashboard' budgetFlowSection={currentBudgetFlowSection}>
      <h2 className='header'> Dashboard </h2>
      <div className='dashboard-content'>
        <p>
          Income: <MoneyValue value={props.income} />
          <br></br>
          savingsPerMonth: <MoneyValue value={props.savingsPerMonth} />
          <br></br>
          spendingPerWeek: <MoneyValue value={props.spendingPerWeek} />
          <br></br>
          timeToGoal: <DurationValue duration={props.timeToGoal} />
          <br></br>
          savingGoal: {props.savingGoal.name}
          <br></br>
          savingGoal.value: <MoneyValue value={props.savingGoal.value} />
          <br></br>
          totalExpensesPerMonth: <MoneyValue value={props.totalExpensesPerMonth} />
          <br></br>
          Expenses:
          <br></br>
          {expenseComponents}
        </p>
      </div>

      <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
        previousButtonText={'Previous Section'} />
    </HomepageSection>
  )
}

export default connect(mapStateToProps)(Dashboard);
