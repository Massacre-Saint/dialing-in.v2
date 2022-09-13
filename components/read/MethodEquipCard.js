import React from 'react';
import PropTypes from 'prop-types';

export default function MethodEquipCard({ obj }) {
  return (
    <div>
      <div className="step-card">
        <div className="step-card-body">
          <div>{obj.name}</div>
          <div>{obj?.type}</div>
        </div>
      </div>
    </div>
  );
}

MethodEquipCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    methodId: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
