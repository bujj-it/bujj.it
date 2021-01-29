import React, {useRef} from "react";
import { connect } from 'react-redux';

import ActionButton from '../elements/ActionButton';
import scrollToSectionEffect from '../effects/scrollToSectionEffect'
import { isCurrentSectionSelector } from '../../selectors/budgetFlowSelectors'
const currentBudgetFlowSection = 'DASHBOARD'

const mapStateToProps = state => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, currentBudgetFlowSection)
  }
}

const Dashboard = props => {

  const sectionRef = useRef(null);

  scrollToSectionEffect(sectionRef)

  const visible = props.isCurrentSection ? 'visible' : ''

  return (
    <section ref={sectionRef} className={`section-container dashboard-container ${visible}`}>
      Welcome to your dashboard
    </section>
  )
}

export default connect(mapStateToProps)(Dashboard);