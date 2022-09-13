import React from 'react';
import PropTypes from 'prop-types';
import { updateRecipe } from '../../utils/data/apiData/userRecipes';

export default function PublishRecipeButton({ onUpdate, steps, recipe }) {
  const handleSubmit = () => {
    const payload = {
      completed: true,
    };
    updateRecipe(recipe.firebaseKey, payload).then(() => {
      onUpdate();
    });
  };
  return (
    <>
      {
      steps.length > 4 && !recipe.completed
        ? (
          <button type="button" onClick={handleSubmit}>Publish</button>
        )
        : (
          ''
        )
    }
    </>
  );
}
PublishRecipeButton.propTypes = {
  steps: PropTypes.arrayOf((PropTypes.shape({
    stepObj: PropTypes.shape({
      direction: PropTypes.string,
      uid: PropTypes.string,
      firebaseKey: PropTypes.string,
    }),
  }))),
  onUpdate: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    uid: PropTypes.string,
    completed: PropTypes.bool,
  }),
};
PublishRecipeButton.defaultProps = {
  steps: PropTypes.arrayOf((PropTypes.shape({
    stepObj: PropTypes.shape({
      direction: '',
      firebaseKey: '',
    }),
  }))),
  recipe: PropTypes.shape({
    completed: false,
  }),
};
