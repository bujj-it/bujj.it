import React from "react";
import { connect } from 'react-redux';
import { NEXT_SECTION } from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  updateSection: currentSection => {
    dispatch({ type: NEXT_SECTION, payload: currentSection })
  }
})

const ActionButton = props => {
  const onButtonClick = () => {
    props.updateSection(props.currentSection)
  }

  return (
    <button className='action-button' onClick={onButtonClick}>
      {props.text}
    </button>
  )
}

export default connect(null, mapDispatchToProps)(ActionButton);