import React from 'react';
import { connect } from 'react-redux';
import {
  maxSavingPercentageSelector,
  sliderSavingPercentageSelector,
} from 'selectors/savingPlanSelectors';
import { UPDATE_SAVING_PERCENTAGE } from 'constants/actionTypes.js';

const mapStateToProps = state => ({
  savingPercentage: sliderSavingPercentageSelector(state),
  maxSavingPercentage: maxSavingPercentageSelector(state),
});

const mapDispatchToProps = dispatch => ({
  updateSavingPercentage: event => {
    dispatch({
      type: UPDATE_SAVING_PERCENTAGE,
      payload: parseInt(event.target.value, 10),
    });
  },
});

const SavingPercentageSlider = props => (
  <div className="input-container dashboard-pane flex-center">
    <p className="title">Saving Percentage</p>
    <div className="slider-section flex-center">
      <span className="percentage">
        {props.savingPercentage}
        {' '}
        %
      </span>
      <input
        type="range"
        min="0"
        max={props.maxSavingPercentage}
        step="1"
        value={props.savingPercentage}
        className="slider-input"
        onChange={props.updateSavingPercentage}
      />
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SavingPercentageSlider);
