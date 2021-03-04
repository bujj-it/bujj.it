import React from "react";
import { connect } from 'react-redux';

import { isCurrentSectionSelector, sectionOffestSelector } from 'selectors/budgetFlowSelectors'

const mapStateToProps = (state, ownProps) => {
  return {
    isCurrentSection: isCurrentSectionSelector(state, ownProps.budgetFlowSection),
    sectionOffest: sectionOffestSelector(state, ownProps.budgetFlowSection),
  }
}

const HomepageSection = props => {

  const classList = `section-container ${props.sectionClass} ${props.isCurrentSection ? 'current-section' : ''}`

  const sectionStyle = {
    left: props.sectionOffest
  }

  return (
    <section className={classList} style={sectionStyle}>
      <div className='section-pane'>
        {props.children}
      </div>
    </section>
  )
} 

export default connect(mapStateToProps)(HomepageSection)