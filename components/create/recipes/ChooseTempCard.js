/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import WaterTempModal from '../../modal/WaterTempModal';

export default function ChooseTempCard({ recipeObj, onUpdate }) {
  return (
    <>
      <WaterTempModal onUpdate={onUpdate} recipeObj={recipeObj} />
    </>
  );
}

ChooseTempCard.propTypes = {
  recipeObj: PropTypes.shape({
    waterTemp: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};
ChooseTempCard.defaultProps = {
  recipeObj: PropTypes.shape({
    waterTemp: 205,
  }),
  onUpdate: () => {},
};
