import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from '../elements/ActionButton';
import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import { isCurrentSectionSelector } from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'INCOME'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection)
  }
}

const Income = props => {

  const sectionRef = useRef(null);

  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane'>
        ENTER INCOME GOAL
        <div className='button-container'>
          <ActionButton text='Add Expenses' currentSection={currentBudgetFlowSection}/>
        </div>
      </div>
    </section>
  )
}

export default connect(mapStateToProps)(Income);