/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default function FavoriteButton({ favoriteState }) {
  useEffect(() => {
  }, [favoriteState]);
  return (
    <>
      {favoriteState
        ? (<AiFillHeart className="color-fill" />)
        : (<AiOutlineHeart className="color-fill" />)}
    </>
  );
}

FavoriteButton.propTypes = {
  favoriteState: PropTypes.bool.isRequired,
};
