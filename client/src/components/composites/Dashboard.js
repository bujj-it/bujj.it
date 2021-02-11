import React, {useRef} from "react";
import { connect } from 'react-redux';

import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import { isCurrentSectionSelector, isSectionVisibleSelector } from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'DASHBOARD'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection),
    isSectionVisible: isSectionVisibleSelector(state, currentBudgetFlowSection),
  }
}

const Dashboard = props => {

  const sectionRef = useRef(null);
  scrollToSectionEffect(sectionRef, props.isCurrentSection)

  const visible = props.isSectionVisible ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container secondary ${visible}`}>
      <div className='section-pane'>
        Welcome to your dashboard
      </div>
    </section>
  )
}

export default connect(mapStateToProps)(Dashboard);