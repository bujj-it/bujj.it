import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from 'components/elements/ActionButton';
import SavingPercentageCard from 'components/elements/SavingPercentageCard';
import SavingPercentageSlider from 'components/elements/SavingPercentageSlider';

import scrollToSectionEffect from 'components/effects/scrollToSectionEffect'
import { isCurrentSectionSelector, isSectionVisibleSelector } from 'selectors/budgetFlowSelectors'
import { TOGGLE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

const currentBudgetFlowSection = 'SAVING_PERCENTAGE'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    isSectionVisible: isSectionVisibleSelector(state, currentBudgetFlowSection),
    isSavingPercentSelected: !!state.savingPercentage,
    isSavingPercentageToggled: state.toggleSavingPercentage
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

  const toggleText = props.isSavingPercentageToggled ? '← Recommended Saving Percentages' : 'Custom Saving Percentage →'

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane'>

        <h2>Select Saving Percentage</h2>

        <div className='saving-percentages-selector'>
          <div className={`saving-percentages-container left-toggle ${props.isSavingPercentageToggled ? '' : 'toggled'}`}>
            <SavingPercentageCard savingPercentage={10}/>
            <SavingPercentageCard savingPercentage={15}/>
            <SavingPercentageCard savingPercentage={20}/>
          </div>
          <div className={`saving-percentages-container right-toggle ${props.isSavingPercentageToggled ? 'toggled' : ''}`}>
            <SavingPercentageSlider/>
          </div>
          <button className='toggle-switch flex-center' onClick={props.toggleSavingPercentageSelector}>
            {toggleText}
          </button>
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