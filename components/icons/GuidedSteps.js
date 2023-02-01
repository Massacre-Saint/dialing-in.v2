import React from 'react';

export default function GuidedSteps() {
  return (
    <>
      <div className="guided-steps-title">
        <span>Helpful Steps</span>
      </div>
      <div className="circles-container">
        <div className="circle padding-circle"><span className="circle-content">Rinse</span></div>
        <div className="circle padding-circle"><span className="circle-content">Bloom</span></div>
        <div className="circle padding-circle"><span className="circle-content">Wait</span></div>
        <div className="circle padding-circle"><span className="circle-content">1st Pour</span></div>
        <div className="circle padding-circle"><span className="circle-content">Agitation?</span></div>
        <div className="circle padding-circle"><span className="circle-content">Wait</span></div>
        <div className="circle padding-circle"><span className="circle-content">Discard</span></div>
      </div>
    </>
  );
}
