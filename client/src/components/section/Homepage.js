import React from "react";

import CallToAction from '../composites/CallToAction'
import SavingGoal from '../composites/SavingGoal'
import Income from '../composites/Income'
import Expenses from '../composites/Expenses'
import Dashboard from "../composites/Dashboard";
import SavingPercentage from "../composites/SavingPercentage";

const Homepage = () => {
  return (
    <div className='homepage-content reading-pane'>
      <CallToAction />
      <SavingGoal />
      <Income />
      <Expenses />
      <SavingPercentage/>
      <Dashboard />
    </div>
  )
};

export default Homepage;