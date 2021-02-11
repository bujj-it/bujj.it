import React, {useRef} from "react";
import { connect } from 'react-redux';

import SectionNavigationButtons from 'components/composites/SectionNavigationButtons'
import scrollToSectionEffect from 'components/effects/scrollToSectionEffect'
import {isCurrentSectionSelector, isSectionVisibleSelector} from 'selectors/budgetFlowSelectors'
import {isInputCompleteSelector} from 'selectors/inputSelectors'
import { UPDATE_SAVING_GOAL_NAME, UPDATE_SAVING_GOAL_VALUE } from 'constants/actionTypes.js';

const currentBudgetFlowSection = 'SAVING_GOAL'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    isSectionVisible: isSectionVisibleSelector(state, currentBudgetFlowSection),
    savingGoalName: state.savingGoal.name,
    savingGoalValue: state.savingGoal.value ? state.savingGoal.value / 100 : '',
    isInputComplete: isInputCompleteSelector(state, 'savingGoal')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSavingGoalNameChange: event => {
      dispatch({ type: UPDATE_SAVING_GOAL_NAME, payload: event.target.value })
    },
    onSavingGoalValueChange: event => {
      dispatch({ type: UPDATE_SAVING_GOAL_VALUE, payload: event.target.value })
    }
  }
}

const SavingGoal = props => {

  const sectionRef = useRef(null);
  scrollToSectionEffect(sectionRef, props.isCurrentSection)

  const visible = props.isSectionVisible ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane saving-goal'>

        <h2> ENTER SAVING GOAL </h2>

        <div className='input-container'>
          <label className='label saving-goal-name-label'>Something To Aim For</label>
          <div className='name'>
            <input type="text"
                name="saving-goal-name" 
                placeholder='Emergency Fund' 
                required 
                value={props.savingGoalName} 
                onChange={props.onSavingGoalNameChange}/>
          </div>
          <div className='value'>
            <span className='denominator'>£</span>
            <input type="number" 
                name="saving-goal-value" 
                min="0" 
                step="0.01" 
                placeholder='1000' 
                required 
                value={props.savingGoalValue} 
                onChange={props.onSavingGoalValueChange}/>
          </div>
        </div>

        <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
            nextButtonText={'Next Section'}
            isInputComplete={props.isInputComplete}/>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingGoal);