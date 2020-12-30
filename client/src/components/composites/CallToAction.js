import React from "react";
import logo from "../../assets/chubby_budgie.jpeg";

const CallToAction = (props) => {
  return (
    <section className='call-to-action-container'>

      <h2 className='cta-header'>Simple Budget Software</h2>

      <div className='cta-subtitle'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>

      <div className='cta-button'>

      </div>

      <div className="cta-pitches">
        <div className='cta-pitch'>
          <div className="cta-icon">
            <img src={logo} className="cta-icon-image" />
          </div>
          <div className="cta-copy">
            Benefit 1!
          </div>
        </div>
        <div className='cta-pitch'>
          <div className="cta-icon">
            <img src={logo} className="cta-icon-image" />
          </div>
          <div className="cta-copy">
            Benefit 2!
          </div>
        </div>
        <div className='cta-pitch'>
          <div className="cta-icon">
            <img src={logo} className="cta-icon-image" />
          </div>
          <div className="cta-copy">
            Benefit 3!
          </div>
        </div>
      </div>

      <div className='cta-button'>

      </div>
    </section>
  );
}

export default CallToAction;