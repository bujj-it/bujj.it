import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from '../elements/ActionButton';
import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import {isCurrentSectionSelector} from '../../selectors/budgetFlowSelectors'
import {isInputCompleteSelector} from '../../selectors/inputSelectors'
import { UPDATE_SAVING_GOAL_NAME, UPDATE_SAVING_GOAL_VALUE } from '../../constants/actionTypes.js';

const currentBudgetFlowSection = 'SAVING_GOAL'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    savingGoalName: state.savingGoal.name,
    savingGoalValue: state.savingGoal.value ? state.savingGoal.value : '',
    isInputComplete: isInputCompleteSelector('savingGoal', state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSavingGoalNameChange: (event) => {
      dispatch({ type: UPDATE_SAVING_GOAL_NAME, payload: event.target.value })
    },
    onSavingGoalValueChange: (event) => {
      dispatch({ type: UPDATE_SAVING_GOAL_VALUE, payload: event.target.value })
    }
  }
}

const SavingGoal = props => {

  const sectionRef = useRef(null);

  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container saving-goal-container ${visible}`}>

      <h2> ENTER SAVING GOAL </h2>

      <div className='input-container saving-goal'>
        <label className='label saving-goal-name-label'>Something To Aim For</label>
        <div className='name saving-goal-name'>
          <input type="text" 
              name="saving-goal-name" 
              placeholder='Emergency Fund' 
              required 
              value={props.savingGoalName} 
              onChange={props.onSavingGoalNameChange}/>
        </div>
        <div className='value saving-goal-value'>
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

      <div className='button-container'>
        <ActionButton 
            text='Add Saving Goal'
            currentSection={currentBudgetFlowSection}
            disabled={!props.isInputComplete}/>
      </div>

    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingGoal);