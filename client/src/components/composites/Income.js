import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from '../elements/ActionButton';
import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import { isCurrentSectionSelector } from '../../selectors/budgetFlowSelectors'
import {isInputCompleteSelector} from 'selectors/inputSelectors'
import {UPDATE_INCOME} from '../../constants/actionTypes'

const currentBudgetFlowSection = 'INCOME'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
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

  const sectionRef = useRef(null);

  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane income'>

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

        <div className='button-container'>
          <ActionButton 
            text='Next Section' 
            currentSection={currentBudgetFlowSection}
            disabled={!props.isInputComplete}/>
        </div>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Income);