import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from 'components/elements/ActionButton';
import scrollToSectionEffect from 'components/effects/scrollToSectionEffect'
import { isCurrentSectionSelector } from 'selectors/budgetFlowSelectors'
import { remainingPerMonthSelector } from 'selectors/savingPlanSelectors'

const currentBudgetFlowSection = 'SAVING_PERCENTAGE'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    remainingPerMonth: remainingPerMonthSelector(state)
  }
}

const Expenses = props => {

  const sectionRef = useRef(null);

  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''

  // const savingsPerMonth
  // const spendingPerWeek
  // const monthsToGoal

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane'>
        Choose Saving Percentag
        
        <div className='button-container'>
          <ActionButton text='Complete Your Budget' currentSection={currentBudgetFlowSection}/>
        </div>
      </div>
    </section>
  )
}

export default connect(mapStateToProps)(Expenses);