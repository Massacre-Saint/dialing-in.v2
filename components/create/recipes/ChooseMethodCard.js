/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useAuth } from '../../../utils/context/authContext';
import { updateRecipe } from '../../../utils/data/apiData/userRecipes';
import { getSingleRecipeMethod } from '../../../utils/data/apiData/mergeData';
import ChooseMethodModal from '../../modal/ChooseMethodModal';

export default function ChooseMethodCard({ recipeObj }) {
  const { user } = useAuth();
  const [recipeMethod, setRecipeMethod] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const payload = {
    firebaseKey: recipeObj.firebaseKey,
    uid: user.uid,
    methodId: null,
    grindId: null,
    waterTemp: null,
    brewTime: null,
    recipeName: null,
    weight: null,
    dose: null,
  };

  const handleClick = () => {
    if (recipeObj.methodId) {
      handleShow();
    } else {
      (router.push({
        pathname: '/create/recipes/method/chooseMethod',
        query: { data: recipeObj.firebaseKey },
      })
      );
    }
  };
  const handleReset = () => {
    updateRecipe(recipeObj.firebaseKey, payload).then(() => router.push({
      pathname: '/create/recipes/method/chooseMethod',
      query: { data: recipeObj.firebaseKey },
    }));
  };
  const handleKeep = () => {
    handleClose();
  };

  useEffect(() => {
    if (recipeObj.methodId) {
      getSingleRecipeMethod(recipeObj.firebaseKey).then((methodObj) => {
        setRecipeMethod(methodObj);
      });
    }
  }, [recipeObj]);
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleClick}>
        <Card.Body>
          <Card.Title>Method:</Card.Title>
          <Card.Text>{recipeMethod ? (recipeMethod?.methodObj?.name) : 'no method'}</Card.Text>
        </Card.Body>
      </Card>
      <ChooseMethodModal show={show} handleClose={handleClose} handleReset={handleReset} handleKeep={handleKeep} />
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
