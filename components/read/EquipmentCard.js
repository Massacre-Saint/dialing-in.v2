import React from 'react';
import Card from 'react-bootstrap/Card';
// import PropTypes from 'prop-types';

export default function Equipment() {
  return (
    <div>
      <Card className="step-card">
        <Card.Body>
          <Card.Title>title</Card.Title>
          <Card.Text />
          <div>
            <span>yo</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
// MethodEquipCard.propTypes = {
//   obj: PropTypes.shape({
//     firebaseKey: PropTypes.string,
//     methodId: PropTypes.string,
//     name: PropTypes.string,
//     type: PropTypes.string,
//   }).isRequired,
// };
