import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from 'components/elements/ActionButton';
import SavingPercentageCard from 'components/elements/SavingPercentageCard';
import SavingPercentageSlider from 'components/elements/SavingPercentageSlider';

import scrollToSectionEffect from 'components/effects/scrollToSectionEffect'
import { isCurrentSectionSelector, isSectionVisibleSelector } from 'selectors/budgetFlowSelectors'
import { TOGGLE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';
import { spendingPerWeekSelector } from 'selectors/savingPlanSelectors'

const currentBudgetFlowSection = 'SAVING_PERCENTAGE'

const recommendedSavingPercentages = [10, 15, 20]

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    isSectionVisible: isSectionVisibleSelector(state, currentBudgetFlowSection),
    isSavingPercentSelected: !!state.savingPercentage,
    isSavingPercentageToggled: state.toggleSavingPercentage,
    isSavingPercentageToggleAvailable: spendingPerWeekSelector(state, 10) >= 0
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleSavingPercentageSelector: () => {
      dispatch({ type: TOGGLE_SAVING_PERCENTAGE })
    }
  }
}

const Expenses = props => {

  const sectionRef = useRef(null);
  scrollToSectionEffect(sectionRef, props.isCurrentSection)

  const visible = props.isSectionVisible ? 'visible' : ''

  let savingPercentageCards
  let toggleButton
  if (props.isSavingPercentageToggleAvailable) {
    savingPercentageCards = (
      <div className={`saving-percentages-container left-toggle ${props.isSavingPercentageToggled ? '' : 'toggled'}`}>
        {recommendedSavingPercentages.map((percentage, i) => <SavingPercentageCard savingPercentage={percentage} key={i}/>)}
      </div>
    )

    const toggleText = props.isSavingPercentageToggled ? '← Recommended Saving Percentages' : 'Custom Saving Percentage →'
    toggleButton = (
      <div className='toggle-switch-container flex-center'>
        <button className='toggle-switch flex-center' onClick={props.toggleSavingPercentageSelector}>
          {toggleText}
        </button>
      </div>
    )
  } 

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane'>

        <h2>Select Saving Percentage</h2>

        <div className='saving-percentages-selector'>
          {savingPercentageCards}
          <div className={`saving-percentages-container right-toggle ${props.isSavingPercentageToggled || !props.isSavingPercentageToggleAvailable ? 'toggled' : ''}`}>
            <SavingPercentageSlider/>
          </div>
          {toggleButton}
        </div>

        <div className='button-container'>
          <ActionButton text='Complete Your Budget' 
              currentSection={currentBudgetFlowSection} 
              disabled={!props.isSavingPercentSelected}>
          </ActionButton>
        </div>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);