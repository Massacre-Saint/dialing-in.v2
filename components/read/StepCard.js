import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deleteStep } from '../../utils/data/apiData/steps';

export default function StepCard({ stepObj, onUpdate }) {
  const handleDelete = () => {
    deleteStep(stepObj.firebaseKey).then(() => {
      onUpdate();
    });
  };
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
            <button type="button" onClick={handleDelete}>Delete</button>
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
  onUpdate: PropTypes.func,
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
  onUpdate: () => {},
  // stepArray: PropTypes.arrayOf((PropTypes.shape({
  //   direction: '',
  //   firebaseKey: '',
  //   order: 0,
  //   recipeId: '',
  // }))),
};
