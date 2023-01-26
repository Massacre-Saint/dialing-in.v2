import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';

export default function ViewAllSteps({ recipe, author }) {
  const router = useRouter();
  const { user } = useAuth();
  const handleClick = () => {
    router.push(`/create/recipes/steps/${recipe.id}`);
  };
  return (
    <div>
      {recipe?.published && author.uid === user.uid
        ? ('')
        : (
          <button type="button" className="btn-lg" onClick={handleClick}>View All Steps</button>
        )}
    </div>
  );
}

ViewAllSteps.propTypes = {
  author: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  recipe: PropTypes.shape({
    published: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
};
