import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from '../elements/ActionButton';
import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import {isCurrentSectionSelector} from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'SAVING_GOAL'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection)
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
        <label class='label saving-goal-name-label'>Something To Aim For</label>
        <div class='name saving-goal-name'>
          <input type="text" name="saving-goal-name" placeholder='Emergency Fund' required/>
        </div>
        <div class='value saving-goal-value'>
          <span class='denominator'>£</span>
          <input type="number" name="saving-goal-value" min="0" step="0.01" placeholder='1000' required/>
        </div>
      </div>

      <div className='button-container'>
        <ActionButton text='Add Saving Goal' currentSection={currentBudgetFlowSection}/>
      </div>

    </section>
  )
}

export default connect(mapStateToProps)(SavingGoal);