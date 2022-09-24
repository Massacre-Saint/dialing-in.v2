import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export default function BrewButton({ recipe }) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const handleClick = () => {
    router.push({
      pathname: '/read/brew',
      query: { firebaseKey },
    });
  };
  return (
    <>
      {recipe?.completed === true
        ? (
          <button type="button" className="btn-lg btn-span-lg-bottom" onClick={handleClick}>Start Brewing</button>
        )
        : (
          ''
        )}
    </>
  );
}

BrewButton.propTypes = {
  recipe: PropTypes.shape({
    completed: PropTypes.bool,
  }),
};
BrewButton.defaultProps = {
  recipe: PropTypes.shape({
    completed: false,
  }),
};
