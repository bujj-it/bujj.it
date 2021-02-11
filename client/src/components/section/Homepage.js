import React from "react";
import { connect } from 'react-redux';

import CallToAction from '../composites/CallToAction'
import SavingGoal from '../composites/SavingGoal'
import Income from '../composites/Income'
import Expenses from '../composites/Expenses'
import Dashboard from "../composites/Dashboard";
import SavingPercentage from "../composites/SavingPercentage";

import { budgetFlowSections } from 'constants/budgetFlowSections'
import { isCurrentSectionSelector } from "selectors/budgetFlowSelectors";

const mapStateToProps = state => {
  return {
    navOffsetClass: isCurrentSectionSelector(state, budgetFlowSections[0]) ? 'nav-offest' : '',
  }
}

const Homepage = props => {
  return (
    <div className={`homepage-content reading-pane ${props.navOffsetClass}`}>
      <CallToAction />
      <SavingGoal />
      <Income />
      <Expenses />
      <SavingPercentage/>
      <Dashboard />
    </div>
  )
};

export default connect(mapStateToProps)(Homepage);