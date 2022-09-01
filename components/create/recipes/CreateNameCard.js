import React from 'react';
import PropTypes from 'prop-types';
import CreateNameModal from '../../modal/CreateNameModal';

export default function CreateNameCard({ recipeObj }) {
  return (
    <CreateNameModal recipeObj={recipeObj} />
  );
}
CreateNameCard.propTypes = {
  recipeObj: PropTypes.shape({
    RecipeName: PropTypes.number,
  }),
};
CreateNameCard.defaultProps = {
  recipeObj: PropTypes.shape({
    recipeName: 205,
  }),
};
