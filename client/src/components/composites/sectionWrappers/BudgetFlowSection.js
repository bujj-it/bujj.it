import React from "react";

import SectionNavigationButtons from 'components/composites/buttons/SectionNavigationButtons'

const BudgetFlowSection = props => {

  const previousButtonText = props.isNoPreviousButton ? null : props.previousButtonText || 'Previous Section'
  const nextButtonText = props.isNoNextButton ? null : props.nextButtonText || 'Next Section'

  return (
    <div className='budget-flow-section'>
      <h2 className='header'> {props.sectionTitle} </h2>

      <div className='budget-flow-content'>
        {props.children}
      </div>

      <SectionNavigationButtons currentBudgetFlowSection={props.currentBudgetFlowSection}
        previousButtonText={previousButtonText}
        nextButtonText={nextButtonText}
        isInputComplete={props.isInputComplete}/>
    </div>
  )
}

export default BudgetFlowSection