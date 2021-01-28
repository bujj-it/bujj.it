import React from "react";
import logo from "../../assets/chubby_budgie.jpeg";
import ActionButton from '../elements/ActionButton';
import nextBudgetFlowSectionHelper from '../../stateHelpers/nextBudgetFlowSectionHelper' 

const currentBudgetFlowSection = 'CTA'
const nextBudgetFlowSection = nextBudgetFlowSectionHelper(currentBudgetFlowSection)

const CallToAction = (props) => {
  return (
    <section className='call-to-action-container'>

      <h2 className='cta-header'>Simple Budget Software</h2>

      <div className='cta-subtitle'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>

      <div className='cta-button-container main'>
        <ActionButton text='GET STARTED' nextSection={nextBudgetFlowSection}/>
      </div>

      <div className="cta-pitches">
        <div className='cta-pitch'>
          <div className="cta-icon">
            <img src={logo} alt='call to action icon 1' />
          </div>
          <div className="cta-copy">
            Benefit 1! Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
        </div>
        <div className='cta-pitch'>
          <div className="cta-icon">
            <img src={logo} alt='call to action icon 2' />
          </div>
          <div className="cta-copy">
            Benefit 2! Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
        </div>
        <div className='cta-pitch'>
          <div className="cta-icon">
            <img src={logo} alt='call to action icon 3'/>
          </div>
          <div className="cta-copy">
            Benefit 3! Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
        </div>
      </div>

      <div className='cta-button-container second'>
        <ActionButton text='GET STARTED' nextSection={nextBudgetFlowSection}/>
      </div>
    </section>
  );
}

export default CallToAction;