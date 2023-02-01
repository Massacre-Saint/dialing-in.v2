import React from 'react';
import PropTypes from 'prop-types';
import { CreateNameModal } from '../modal';

export default function CreateNameCard({ recipeObj, onUpdate }) {
  return (
    <CreateNameModal onUpdate={onUpdate} recipeObj={recipeObj} />
  );
}
CreateNameCard.propTypes = {
  recipeObj: PropTypes.shape({
    recipe_name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
