import React from "react";
import { connect } from 'react-redux';
import { 
  maxSavingPercentageSelector,
  sliderSavingPercentageSelector
} from 'selectors/savingPlanSelectors'
import { UPDATE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

const mapStateToProps = state => {
  return {
    savingPercentage: sliderSavingPercentageSelector(state),
    maxSavingPercentage: maxSavingPercentageSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSavingPercentage: event => {
      dispatch({ 
        type: UPDATE_SAVING_PERCENTAGE,
        payload: parseInt(event.target.value, 10)
      })
    }
  }
}

const SavingPercentageSlider = props => {

  return (
    <div className='input-container dashboard-pane flex-center'>
      <p className='title'>Saving Percentage</p>
      <div className='percentage'>
        {props.savingPercentage} %
      </div>
      <div className='value slider-section'>
        <input type="range"
            min="0"
            max={props.maxSavingPercentage}
            step='1'
            value={props.savingPercentage}
            className="slider-input"
            onChange={props.updateSavingPercentage} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingPercentageSlider);
