import React, {useEffect, useRef} from "react";
import { connect } from 'react-redux';

import {isCurrentSectionSelector} from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'SAVINGS_GOAL'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection)
  }
}

const SavingsGoal = props => {

  const sectionRef = useRef(null);

  useEffect(() => {
    window.scroll({
      top: sectionRef.current.getBoundingClientRect().top,
      left: 0, 
      behavior: 'smooth'
    });
  })

  const visible = props.isCurrentSection ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container savings-goal-container ${visible}`}>
      ENTER SAVINGS GOAL
    </section>
  )
}

export default connect(mapStateToProps)(SavingsGoal);