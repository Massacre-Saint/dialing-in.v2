import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';

export default function AddStep({ stepArray, recipe }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const handleClick = () => {
    router.push(`/create/recipes/steps/${firebaseKey}`);
  };
  return (
    <>
      {
      !recipe.completed
        ? (
          <button type="button" onClick={handleClick}>{stepArray.length ? 'View Steps' : 'Add Step'}</button>
        )
        : (
          <button type="button" onClick={handleClick}>View All Steps</button>
        )
      }
    </>
  );
}

AddStep.propTypes = {
  stepArray: PropTypes.arrayOf((PropTypes.shape({
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }))),
  recipe: PropTypes.shape({
    uid: PropTypes.string,
    completed: PropTypes.bool,
  }),
};
AddStep.defaultProps = {
  stepArray: PropTypes.arrayOf((PropTypes.shape({
    uid: PropTypes.string,
    firebaseKey: '',
  }))),
  recipe: PropTypes.shape({
    uid: '',
    completed: false,
  }),
};
