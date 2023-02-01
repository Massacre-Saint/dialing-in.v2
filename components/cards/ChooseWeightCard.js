/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { WaterWeightModal } from '../modal';

export default function ChooseTempCard({ recipeObj, onUpdate }) {
  return (
    <>
      <WaterWeightModal onUpdate={onUpdate} recipe={recipeObj} />
    </>
  );
}

ChooseTempCard.propTypes = {
  recipeObj: PropTypes.shape({
    id: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
