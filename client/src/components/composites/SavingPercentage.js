import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from '../elements/ActionButton';
import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import { isCurrentSectionSelector } from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'SAVING_PERCENTAGE'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection)
  }
}

const Expenses = props => {

  const sectionRef = useRef(null);

  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container expenses-container ${visible}`}>
      Choose Saving Percentage
      <div className='button-container'>
        <ActionButton text='Choose Savings Rate' currentSection={currentBudgetFlowSection}/>
      </div>
    </section>
  )
}

export default connect(mapStateToProps)(Expenses);