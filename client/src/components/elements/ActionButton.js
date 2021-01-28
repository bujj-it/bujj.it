import React from "react";
import { connect } from 'react-redux';
import { NEXT_SECTION } from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  updateSection: nextSection => {
    dispatch({ type: NEXT_SECTION, payload: nextSection })
  }
})

const ActionButton = props => {
  const onButtonClick = () => {
    props.updateSection(props.nextSection)
  }

  return (
    <button className='action-button' onClick={onButtonClick}>
      {props.text}
    </button>
  )
}

export default connect(null, mapDispatchToProps)(ActionButton);