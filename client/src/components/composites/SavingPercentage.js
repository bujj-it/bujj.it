import React from "react";
import { connect } from 'react-redux';

import SectionNavigationButtons from 'components/composites/SectionNavigationButtons';
import SavingPercentageCard from 'components/elements/SavingPercentageCard';
import SavingPercentageSlider from 'components/elements/SavingPercentageSlider';

import { TOGGLE_SAVING_PERCENTAGE, UPDATE_SAVING_PERCENTAGE, RESET_SAVING_PERCENTAGE } from 'constants/actionTypes.js';
import { spendingPerWeekSelector, defaultCustomSavingPercentageSelector } from 'selectors/savingPlanSelectors'
import HomepageSection from "components/elements/HomepageSection";

const currentBudgetFlowSection = 'SAVING_PERCENTAGE'

const recommendedSavingPercentages = [10, 15, 20]
const reducedSavingPercentages = [0, 3, 5]

const mapStateToProps = state => {
  return {
    isInputComplete: state.savingPercentage !== null,
    isSavingPercentageToggled: state.toggleSavingPercentage,
    isRecommendedSavingPercentagesAvailable: spendingPerWeekSelector(state, Math.min(...recommendedSavingPercentages)) >= 0,
    defaultCustomSavingPercentage: defaultCustomSavingPercentageSelector(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleSavingPercentageSelection: (toggleValue, newSavingPercentage) => {
      dispatch({ type: TOGGLE_SAVING_PERCENTAGE, payload: toggleValue })
      if (toggleValue) {
        dispatch({ type: UPDATE_SAVING_PERCENTAGE, payload: newSavingPercentage })
      } else {
        dispatch({ type: RESET_SAVING_PERCENTAGE })
      }
    }
  }
}

const Expenses = props => {

  const availableSavingPercentages = props.isRecommendedSavingPercentagesAvailable ? recommendedSavingPercentages : reducedSavingPercentages
  const savingPercentageCards = availableSavingPercentages.map((percentage, i) => <SavingPercentageCard savingPercentage={percentage} key={i}/>)

  const toggleText = props.isSavingPercentageToggled ? '← Recommended Saving Percentages' : 'Custom Saving Percentage →'

  const handleToggleClick = () => {
    props.toggleSavingPercentageSelection(!props.isSavingPercentageToggled, props.defaultCustomSavingPercentage)
  }

  return (
    <HomepageSection sectionClass='saving-percentage' budgetFlowSection={currentBudgetFlowSection}>
      <h2>Select Saving Percentage</h2>

      <div className='saving-percentages-selector'>
        <div className={`saving-percentages-container left-toggle ${props.isSavingPercentageToggled ? '' : 'toggled'}`}>
          {savingPercentageCards}
        </div>
        <div className={`saving-percentages-container right-toggle ${props.isSavingPercentageToggled ? 'toggled' : ''}`}>
          <SavingPercentageSlider/>
        </div>
        <div className='toggle-switch-container flex-center'>
          <button className='toggle-switch flex-center' onClick={handleToggleClick}>
            {toggleText}
          </button>
        </div>
      </div>

      <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
          previousButtonText={'Previous Section'}
          nextButtonText={'Complete Budget'}
          isInputComplete={props.isInputComplete}/>
    </HomepageSection>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);