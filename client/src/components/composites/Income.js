import React from "react";
import { connect } from 'react-redux';

import SectionNavigationButtons from 'components/composites/SectionNavigationButtons'
import {isInputCompleteSelector} from 'selectors/inputSelectors'
import {UPDATE_INCOME} from 'constants/actionTypes'
import HomepageSection from "components/elements/HomepageSection";

const currentBudgetFlowSection = 'INCOME'

const mapStateToProps = state => {
  return {
    income: state.income ? state.income / 100 : '',
    isInputComplete: isInputCompleteSelector(state, 'income')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncomeChange: event => {
      dispatch({type: UPDATE_INCOME, payload: event.target.value})
    }
  }  
}

const Income = props => {

  return (
    <HomepageSection sectionClass='income' budgetFlowSection={currentBudgetFlowSection}>
      <h2> ENTER YOUR INCOME </h2>

      <div className='input-container'>
        <label className='label'>Your monthly income</label>
        <div className='value'>
          <span className='denominator'>£</span>
          <input type="number" 
              name="income-value" 
              min="0" 
              step="0.01" 
              placeholder='1000' 
              required 
              value={props.income} 
              onChange={props.onIncomeChange}/>
        </div>
      </div>

      <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
          previousButtonText={'Previous Section'}
          nextButtonText={'Next Section'}
          isInputComplete={props.isInputComplete}/>
    </HomepageSection>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Income);