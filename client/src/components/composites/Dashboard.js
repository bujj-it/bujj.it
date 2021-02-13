import React from "react";
import { connect } from 'react-redux';
import HomepageSection from "components/elements/HomepageSection";
import SectionNavigationButtons from 'components/composites/SectionNavigationButtons'
import { MoneyValue } from 'components/elements/MoneyValue'
import { DurationValue } from 'components/elements/DurationValue'
import IncomeInput from 'components/elements/IncomeInput';
import MainPieChart from 'components/elements/MainPieChart'
import {
  savingsPerMonthSelector,
  spendingPerWeekSelector,
  timeToGoalSelector
} from 'selectors/savingPlanSelectors'
import {
  totalExpensesPerMonthSelector
} from 'selectors/expensesSelectors'
import { expensesSelector } from "selectors/expensesSelectors";
import { isCurrentSectionSelector } from 'selectors/budgetFlowSelectors'

const currentBudgetFlowSection = 'DASHBOARD'

const mapStateToProps = (state) => {
  return {
    income: state.income,
    savingsPerMonth: savingsPerMonthSelector(state),
    spendingPerWeek: spendingPerWeekSelector(state),
    timeToGoal: timeToGoalSelector(state),
    totalExpensesPerMonth: totalExpensesPerMonthSelector(state),
    expenses: expensesSelector(state),
    savingGoal: state.savingGoal,
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
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
  
  const isMainPieChart = props.isCurrentSection ? <MainPieChart className='main' /> : ''

  return (
    <HomepageSection sectionClass='dashboard' budgetFlowSection={currentBudgetFlowSection}>
      <div className='dashboard-grid'>
        <h2 className='header'> Dashboard </h2>

        {isMainPieChart}

        <div className='income'>
          <IncomeInput />
        </div>

        <p className='saving-goal'>
          savingGoal: {props.savingGoal.name}
          <br></br>
          savingGoal.value: <MoneyValue value={props.savingGoal.value} />
        </p>

        <p className='money'>
          Income: <MoneyValue value={props.income} />
          <br></br>
          savingsPerMonth: <MoneyValue value={props.savingsPerMonth} />
          <br></br>
          spendingPerWeek: <MoneyValue value={props.spendingPerWeek} />
        </p>

        <div className='expenses'>
          <p>
            totalExpensesPerMonth: <MoneyValue value={props.totalExpensesPerMonth} />
          </p>
          <p>
            Expenses:
          </p>
          <p>
            {expenseComponents}
          </p>
        </div>

        <div className='nav-buttons'>
        <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
          previousButtonText={'Previous Section'} />
        </div>
      </div>

        
    </HomepageSection>
  )
}

export default connect(mapStateToProps)(Dashboard);
