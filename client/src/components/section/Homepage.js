import React from "react";

import CallToAction from '../composites/CallToAction'
import SavingsGoal from '../composites/SavingsGoal'
import Income from '../composites/Income'

const Homepage = () => {
  return (
    <div className='homepage-content reading-pane'>
      <CallToAction />
      <SavingsGoal />
      <Income />

    </div>
  )
};

export default Homepage;