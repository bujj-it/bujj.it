import React from "react";

import ActionButton from 'components/elements/ActionButton';

const SectionNavigationButtons = props => {

  let previousButton
  if (!!props.previousButtonText) {
    previousButton = (
      <ActionButton 
        text={props.previousButtonText}
        currentSection={props.currentBudgetFlowSection}
        isFlowDirectionForward={false}/>
    )
  }

  let nextButton
  if (!!props.nextButtonText) {
    nextButton = (
      <ActionButton 
          text={props.nextButtonText}
          currentSection={props.currentBudgetFlowSection}
          disabled={!props.isInputComplete}
          isFlowDirectionForward={true}/>
    )
  }

  return (
    <div className='section-navigation-container'>
       {previousButton}
       {nextButton}
    </div>
  )
}

export default SectionNavigationButtons