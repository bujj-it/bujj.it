import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from '../elements/ActionButton';
import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import {isCurrentSectionSelector} from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'SAVINGS_GOAL'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection)
  }
}

const SavingsGoal = props => {

  const sectionRef = useRef(null);

  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container savings-goal-container ${visible}`}>
      ENTER SAVINGS GOAL
      <div className='button-container'>
        <ActionButton text='Add Income' currentSection={currentBudgetFlowSection}/>
      </div>
    </section>
  )
}

export default connect(mapStateToProps)(SavingsGoal);