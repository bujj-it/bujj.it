import React from "react";
import { connect } from 'react-redux';
import { NEXT_SECTION, PREVIOUS_SECTION } from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  updateSection: (currentSection, isFlowDirectionForward) => {
    if (isFlowDirectionForward) {
      dispatch({ type: NEXT_SECTION, payload: currentSection })
    } else {
      dispatch({ type: PREVIOUS_SECTION, payload: currentSection })
    }
  }
})

const ActionButton = props => {

  const onButtonClick = () => {
    props.updateSection(props.currentSection, props.isFlowDirectionForward)
  }

  const buttonClass = props.isFlowDirectionForward ? ' next' : ' previous'

  return (
    <button className={`action-button${buttonClass}`} 
        onClick={onButtonClick}
        disabled={props.disabled}>
      {props.text}
    </button>
  )
}

export default connect(null, mapDispatchToProps)(ActionButton);