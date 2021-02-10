import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from 'components/elements/ActionButton';
import SavingPercentageItem from 'components/elements/SavingPercentageItem';

import scrollToSectionEffect from 'components/effects/scrollToSectionEffect'
import { isCurrentSectionSelector, isSectionVisibleSelector } from 'selectors/budgetFlowSelectors'


const currentBudgetFlowSection = 'SAVING_PERCENTAGE'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    isSectionVisible: isSectionVisibleSelector(state, currentBudgetFlowSection)
  }
}

const Expenses = props => {

  const sectionRef = useRef(null);
  scrollToSectionEffect(sectionRef, props.isCurrentSection)

  const visible = props.isSectionVisible ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane'>

        <h2>Select Saving Percentage</h2>

        <div className='saving-percentages-container'>
          <SavingPercentageItem savingPercentage={10}/>
          <SavingPercentageItem savingPercentage={15}/>
          <SavingPercentageItem savingPercentage={20}/>
        </div>
        
        <div className='button-container'>
          <ActionButton text='Complete Your Budget' currentSection={currentBudgetFlowSection}/>
        </div>
      </div>
    </section>
  )
}

export default connect(mapStateToProps)(Expenses);