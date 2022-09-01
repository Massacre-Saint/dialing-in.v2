/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { updateRecipe, getRecipe } from '../../utils/data/apiData/userRecipes';
import { useAuth } from '../../utils/context/authContext';

export default function Grind({ grindObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const firebaseKey = router.query.data;
  const [userRecipe, setUserRecipe] = useState({});
  const payload = {
    ...userRecipe,
    grindId: grindObj.fbKey,
  };
  const handleSubmit = () => {
    updateRecipe(userRecipe.firebaseKey, payload).then(() => router.push(`/create/recipes/${userRecipe.firebaseKey}`));
  };
  useEffect(() => {
    getRecipe(firebaseKey).then(setUserRecipe);
  }, [user]);
  return (
    <div>
      <Image thumbnail width="120x" src={grindObj.imageUrl} onClick={handleSubmit} />
      <h4>{grindObj.grindSize}</h4>
    </div>
  );
}
Grind.propTypes = {
  grindObj: PropTypes.shape(
    {
      fbKey: PropTypes.string,
      imageUrl: PropTypes.string,
      grindSize: PropTypes.string,
      specified: PropTypes.bool,
    },
  ),
};
Grind.defaultProps = {
  grindObj: PropTypes.shape(
    {
      fbKey: '',
      imageUrl: '',
      grindSize: '',
      specified: false,
    },
  ),
};
