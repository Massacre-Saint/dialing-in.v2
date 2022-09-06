import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';

export default function ViewAllSteps({ recipe }) {
  const { user } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/create/recipes/steps/${recipe.firebaseKey}`);
  };
  return (
    <>
      {
      recipe.uid === user.uid && !recipe.completed
        ? (
          <button type="button" onClick={handleClick}>View All Steps</button>
        )
        : ('')
    }

    </>
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
