import React from 'react';
import PropTypes from 'prop-types';
import WaterTempModal from '../../modal/WaterTempModal';

export default function ChooseTempCard({ recipeObj }) {
  return (
    <>
      <WaterTempModal recipeObj={recipeObj} />
    </>
  );
}
ChooseTempCard.propTypes = {
  recipeObj: PropTypes.shape({
    waterTemp: PropTypes.number,
  }),
};
ChooseTempCard.defaultProps = {
  recipeObj: PropTypes.shape({
    waterTemp: 205,
  }),
};
