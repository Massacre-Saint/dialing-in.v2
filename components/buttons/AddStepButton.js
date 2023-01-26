import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';

export default function AddStep({ stepArray, recipe }) {
  const router = useRouter();
  const { id } = router.query;
  const handleClick = () => {
    router.push(`/create/recipes/steps/${id}`);
  };
  return (
    <>
      {
      !recipe.published
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
    id: PropTypes.id,
  }))).isRequired,
  recipe: PropTypes.shape({
    published: PropTypes.bool,
  }).isRequired,
};
