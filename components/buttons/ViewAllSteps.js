import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';

export default function ViewAllSteps({ recipe }) {
  const router = useRouter();
  const { user } = useAuth();
  const handleClick = () => {
    router.push(`/create/recipes/steps/${recipe.firebaseKey}`);
  };
  return (
    <div className="steps-btn-container">
      {recipe?.completed && recipe.uid === user.uid
        ? ('')
        : (
          <button type="button" className="btn-lg" onClick={handleClick}>View All Steps</button>
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
