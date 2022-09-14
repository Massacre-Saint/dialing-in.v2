import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';

export default function ViewAllSteps({ recipe }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/create/recipes/steps/${recipe.firebaseKey}`);
  };
  return (
    <div className="steps-btn-container">
      {recipe.completed === true
        ? ('')
        : (
          <button type="button" className="btn-med" onClick={handleClick}>View All Steps</button>
        )}
    </div>
  );
}

ViewAllSteps.propTypes = {
  recipe: PropTypes.shape({
    uid: PropTypes.string,
    completed: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};
ViewAllSteps.defaultProps = {
  recipe: PropTypes.shape({
    uid: '',
    completed: true,
    firebaseKey: '',
  }),
};
