import React from 'react';
import { connect } from 'react-redux';

import HomepageSection from 'components/composites/sectionWrappers/HomepageSection';
import Sidebar from 'components/composites/dashboard/Sidebar';
import YourBudget from 'components/composites/dashboard/YourBudget';
import SignUp from 'components/composites/dashboard/SignUp';
import Login from 'components/composites/dashboard/Login';

import { YOUR_BUDGET, SIGNUP, LOGIN } from 'constants/dashboardSections.constants';

const currentBudgetFlowSection = 'DASHBOARD';

const mapStateToProps = state => ({
  dashboardSection: state.dashboardSection,
});

const Dashboard = props => {
  const dashboardSectionElement = section => {
    switch (section) {
      case SIGNUP:
        return <SignUp />;
      case LOGIN:
        return <Login />;
      case YOUR_BUDGET:
      default:
        return <YourBudget />;
    }
  };

  const dashboardSection = dashboardSectionElement(props.dashboardSection);

  return (
    <HomepageSection sectionClass="dashboard" budgetFlowSection={currentBudgetFlowSection}>
      <div className="dashboard-grid">

        <Sidebar />

        {dashboardSection}

      </div>

    </HomepageSection>
  );
};

export default connect(mapStateToProps)(Dashboard);
