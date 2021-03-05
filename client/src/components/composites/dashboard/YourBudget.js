import React from 'react';

import SectionNavigationButtons from 'components/composites/buttons/SectionNavigationButtons';
import SavingGoalInput from 'components/elements/dashboard/SavingGoalInput';
import TimeToGoal from 'components/elements/dashboard/TimeToGoal';
import SavingsPerMonth from 'components/elements/dashboard/SavingsPerMonth';
import SpendingPerWeek from 'components/elements/dashboard/SpendingPerWeek';
import SavingPercentageSlider from 'components/elements/dashboard/SavingPercentageSlider';
import ExpensesInput from 'components/elements/inputs/ExpensesInput';
import MainPieChart from 'components/elements/charts/MainPieChart';
import InfoCard from 'components/elements/dashboard/InfoCard';

import SavingGoalValue from 'components/elements/dashboard/SavingGoalValue';

const currentBudgetFlowSection = 'DASHBOARD';

const YourBudget = props => {
  // const mainPieChart = props.isCurrentSection ? <MainPieChart className="summary" /> : '';

  return (
    <>
      <h2 className="main-header">
        Your Budget
      </h2>

      <div className="info-cards-container">
        <InfoCard title="Saving Goal">
          <SavingGoalValue />
        </InfoCard>

        <InfoCard title="Saving Goal">
          <SavingGoalValue />
        </InfoCard>

        <InfoCard title="Saving Goal">
          <SavingGoalValue />
        </InfoCard>

        <InfoCard title="Saving Goal">
          <SavingGoalValue />
        </InfoCard>
      </div>

      {/* <div className="saving-goal flex-center">

      </div>
      <div className="time-to-goal flex-center">
        <TimeToGoal />
      </div>
      <div className="saving-per-month flex-center">
        <SavingsPerMonth />
      </div>

      <div className="spending-per-week flex-center">
        <SpendingPerWeek />
      </div>

      <div className="saving-percentage">
        <SavingPercentageSlider />
      </div>

      <div className='income flex-center'>
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

      <div className="nav-buttons">
        <SectionNavigationButtons
          currentBudgetFlowSection={currentBudgetFlowSection}
          previousButtonText="Previous Section"
        />
      </div>
    </>
  );
};

export default YourBudget;
