import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function MethodEquipCard({ obj }) {
  return (
    <div>
      <Card className="step-card">
        <Card.Body>
          <Card.Title>{obj.name}</Card.Title>
          <Card.Text>{obj?.type}</Card.Text>
        </Card.Body>
      </Card>
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
