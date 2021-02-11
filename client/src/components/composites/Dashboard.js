import React from "react";

import HomepageSection from "components/elements/HomepageSection";
import SectionNavigationButtons from 'components/composites/SectionNavigationButtons'

const currentBudgetFlowSection = 'DASHBOARD'

const Dashboard = props => {

  return (
    <HomepageSection sectionClass='dashboard' budgetFlowSection={currentBudgetFlowSection}>
      Welcome to your dashboard

      <SectionNavigationButtons currentBudgetFlowSection={currentBudgetFlowSection}
          previousButtonText={'Previous Section'}/>
    </HomepageSection>
  )
}

export default Dashboard;