import React from "react";
import { connect } from 'react-redux';

import { spendingPerWeekSelector } from 'selectors/savingPlanSelectors'
import MoneyValue from 'components/elements/MoneyValue'

const mapStateToProps = state => {
  return {
    spendingPerWeek: spendingPerWeekSelector(state)
  }
}

const SavingsPerMonth = props => {

  return (
    <div className='input-container dashboard-pane'>
      <p className='title'>Weekly Beer Fund</p>
      <MoneyValue value={props.spendingPerWeek}/>
    </div>
  )
}

export default connect(mapStateToProps)(SavingsPerMonth);
