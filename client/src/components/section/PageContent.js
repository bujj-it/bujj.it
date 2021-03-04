import React from "react";
import { connect } from 'react-redux';

import CallToAction from 'components/section/budgetFlowSections/CallToAction'
import SavingGoal from 'components/section/budgetFlowSections/SavingGoal'
import Income from 'components/section/budgetFlowSections/Income'
import Expenses from 'components/section/budgetFlowSections/Expenses'
import Dashboard from "components/section/budgetFlowSections/Dashboard";
import SavingPercentage from "components/section/budgetFlowSections/SavingPercentage";

import { budgetFlowSections } from 'constants/budgetFlowSections'
import { isCurrentSectionSelector } from "selectors/budgetFlowSelectors";

const mapStateToProps = state => {
  return {
    navOffsetClass: isCurrentSectionSelector(state, budgetFlowSections[0]) ? 'nav-offest' : '',
  }
}

const PageContent = props => {
  return (
    <div className={`homepage-content reading-pane ${props.navOffsetClass}`}>
      <CallToAction />
      <SavingGoal />
      <Income />
      <Expenses />
      <SavingPercentage/>
      <Dashboard />
      <div className='side-blur left'></div>
      <div className='side-blur right'></div>
    </div>
  )
};

export default connect(mapStateToProps)(PageContent);