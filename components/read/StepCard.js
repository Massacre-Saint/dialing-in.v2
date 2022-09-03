import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function StepCard({ stepObj }) {
  useEffect(() => [stepObj]);
  return (
    <>
      <Card style={{ width: 'auto' }}>
        <Card.Body>
          <Card.Title />
          <Card.Text />
          <div>
            <span>{stepObj?.order}. </span>
            <span>{stepObj?.direction}</span>
            <span />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
StepCard.propTypes = {
  stepObj: PropTypes.shape({
    direction: PropTypes.string,
    firebaseKey: PropTypes.string,
    order: PropTypes.number,
    recipeId: PropTypes.string,
  }),
  // stepArray: PropTypes.arrayOf((PropTypes.shape({
  //   direction: PropTypes.string,
  //   firebaseKey: PropTypes.string,
  //   order: PropTypes.number,
  //   recipeId: PropTypes.string,
  // }))),
};

StepCard.defaultProps = {
  stepObj: PropTypes.shape({
    direction: '',
    firebaseKey: '',
    order: '',
    recipeId: '',
  }),
  // stepArray: PropTypes.arrayOf((PropTypes.shape({
  //   direction: '',
  //   firebaseKey: '',
  //   order: 0,
  //   recipeId: '',
  // }))),
};
