import React from 'react';
import PropTypes from 'prop-types';
import { updateRecipe } from '../../utils/data/apiData/recipes';

export default function PublishRecipeButton({ onUpdate, steps, recipe }) {
  const handleSubmit = () => {
    const payload = {
      published: true,
      dose: recipe.dose,
      brewTime: recipe.brew_time,
      grindId: recipe.grind_id.id,
      methodId: recipe.method_id.id,
      weight: recipe.weight,
      recipeName: recipe.recipe_name,
    };
    updateRecipe(recipe.id, payload).then(() => {
      onUpdate();
    });
  };
  return (
    <>
      {
      steps.length > 4 && !recipe.published
        ? (
          <button type="button" className="btn-lg" onClick={handleSubmit}>Publish</button>
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
      id: PropTypes.number,
    }),
  }))).isRequired,
  onUpdate: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    dose: PropTypes.number,
    brew_time: PropTypes.number,
    grind_id: PropTypes.shape({
      id: PropTypes.number,
    }),
    method_id: PropTypes.shape({
      id: PropTypes.number,
    }),
    weight: PropTypes.number,
    recipe_name: PropTypes.string,
    published: PropTypes.bool,
  }).isRequired,
};
