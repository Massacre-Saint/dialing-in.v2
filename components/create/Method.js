/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getRecipe, updateRecipe } from '../../utils/data/apiData/userRecipes';
import { useAuth } from '../../utils/context/authContext';

export default function Method({ methodObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const firebaseKey = router.query.data;
  const [userRecipe, setUserRecipe] = useState({});
  const payload = {
    ...userRecipe,
    methodId: methodObj.firebaseKey,
  };
  const handleSubmit = () => {
    updateRecipe(userRecipe.firebaseKey, payload).then(() => router.push(`/create/recipes/${userRecipe.firebaseKey}`));
  };
  useEffect(() => {
    getRecipe(firebaseKey).then(setUserRecipe);
  }, [user]);
  const src = `${methodObj.imageUrl}`;
  return (
    <div className="method-circle">
      <div>
        <Nav.Link type="submit" onClick={handleSubmit}>
          <Image className="method-circle-content" loader={() => src} height={140} width={140} src={methodObj.imageUrl} />
        </Nav.Link>
      </div>
      <h4>{methodObj.name}</h4>
    </div>
  );
}
Method.propTypes = {
  methodObj: PropTypes.shape(
    {
      firebaseKey: PropTypes.string,
      imageUrl: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
    },
  ),
};
Method.defaultProps = {
  methodObj: PropTypes.shape(
    {
      firebaseKey: '',
      imageUrl: '',
      description: '',
      name: '',
    },
  ),
};
