import React from "react";
import { connect } from 'react-redux';
import HomepageSection from "components/composites/sectionWrappers/HomepageSection";
import SectionNavigationButtons from 'components/composites/buttons/SectionNavigationButtons'
import MoneyValue from 'components/elements/values/MoneyValue'
import DurationValue from 'components/elements/values/DurationValue'
import IncomeInput from 'components/elements/inputs/IncomeInput';
import SavingGoalInput from 'components/elements/dashboard/SavingGoalInput'
import TimeToGoal from 'components/elements/dashboard/TimeToGoal'
import SavingsPerMonth from 'components/elements/dashboard/SavingsPerMonth'
import SpendingPerWeek from 'components/elements/dashboard/SpendingPerWeek'
import SavingPercentageSlider from 'components/elements/dashboard/SavingPercentageSlider'
import ExpensesInput from 'components/elements/inputs/ExpensesInput'
import MainPieChart from 'components/elements/charts/MainPieChart'
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
  
  const mainPieChart = props.isCurrentSection ? <MainPieChart className='summary' /> : ''

  return (
    <HomepageSection sectionClass='dashboard' budgetFlowSection={currentBudgetFlowSection}>
      <div className='dashboard-grid'>
        <h2 className='main-header'> Dashboard </h2>

        

        <div className='saving-goal flex-center'>
          <SavingGoalInput />
        </div>
        <div className='time-to-goal flex-center'>
          <TimeToGoal />
        </div>
        <div className='saving-per-month flex-center'>
          <SavingsPerMonth />
        </div>

        <div className='spending-per-week flex-center'>
          <SpendingPerWeek />
        </div>
    
        <div className='saving-percentage'>
          <SavingPercentageSlider />
        </div>

        {/* <div className='income flex-center'>
          <IncomeInput />
        </div>

        {mainPieChart}

        <div className='saving-percentage flex-center column'>
          <label className='title'>Saving Percentage</label>
          <SavingPercentageSlider />
        </div>

        <div className='expenses flex-center column'>
          <label className='title'>Expenses</label>
          <ExpensesInput />
        </div> */}

        <div className='nav-buttons'>
          <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
              previousButtonText={'Previous Section'} />
        </div>

      </div>

        
    </HomepageSection>
  )
}

export default connect(mapStateToProps)(Dashboard);
