import React from "react";

import CallToAction from '../composites/CallToAction'
import SavingsGoal from '../composites/SavingsGoal'

const Homepage = () => {
  return (
    <div className='homepage-content reading-pane'>
      <CallToAction />
      <SavingsGoal />

    </div>
  )
};

export default Homepage;