import React from 'react';
import PropTypes from 'prop-types';

export default function MethodEquipCard({ obj }) {
  return (
    <div className="card-container">
      <div>
        <div>
          <div className="spaced-line-items">
            <span className="line-item-header">Name: </span>
            <span className="dotted-line" />
            <span>{obj.name}</span>
          </div>
          <div className="spaced-line-items">
            <span className="line-item-header">Type:</span>
            <span className="dotted-line" />
            <span>{obj?.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

MethodEquipCard.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
