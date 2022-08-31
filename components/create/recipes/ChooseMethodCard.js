import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { getMethods } from '../../../utils/data/apiData/methods';
import { useAuth } from '../../../utils/context/authContext';
import { updateRecipe } from '../../../utils/data/apiData/userRecipes';

export default function ChooseMethodCard({ recipeObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const [, setMethods] = useState([]);
  const payload = {
    firebaseKey: recipeObj.firebaseKey,
    uid: user.uid,
    methodId: '',
  };
  const handleClick = () => {
    if (recipeObj.methodId) {
      if (window.confirm('Choosing another method will reset recipe?')) {
        updateRecipe(recipeObj.firebaseKey, payload).then(() => router.push({
          pathname: '/create/recipes/method/chooseMethod',
          query: { data: recipeObj.firebaseKey },
        }));
      }
    } else {
      (router.push({
        pathname: '/create/recipes/method/chooseMethod',
        query: { data: recipeObj.firebaseKey },
      })
      );
    }
  };
  useEffect(() => {
    getMethods().then(setMethods);
  }, [user]);
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleClick}>
        <Card.Body>
          <Card.Title>Choose Method</Card.Title>
          <Card.Text />
        </Card.Body>
      </Card>
    </>

  );
}

ChooseMethodCard.propTypes = {
  recipeObj: PropTypes.shape({
    methodId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
ChooseMethodCard.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    methodId: '',
  }),
};
