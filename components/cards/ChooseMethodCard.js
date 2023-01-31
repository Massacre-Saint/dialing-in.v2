/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { ChooseMethodModal } from '../modal';
import { updateRecipe } from '../../utils/data/apiData/recipes';

export default function ChooseMethodCard({ recipeObj }) {
  const [recipeMethod, setRecipeMethod] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  const payload = {
    methodId: null,
    grindId: null,
    brew_time: null,
    weight: null,
    dose: null,
    recipe_name: null,
  };

  const handleClick = () => {
    if (recipeObj.method_id) {
      handleShow();
    } else {
      (router.push({
        pathname: '/create/recipes/method/chooseMethod',
        query: { data: recipeObj.id },
      })
      );
    }
  };
  const handleReset = () => {
    updateRecipe(recipeObj.id, payload);
    router.push({
      pathname: '/create/recipes/method/chooseMethod',
      query: { data: recipeObj.id },
    });
  };
  const handleKeep = () => {
    handleClose();
  };

  useEffect(() => {
    if (recipeObj.method_id) {
      setRecipeMethod(recipeObj.method_id);
    }
  }, [recipeObj]);
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleClick}>
        <Card.Body>
          <Card.Title>Method:</Card.Title>
          <Card.Text>{recipeMethod ? (recipeMethod.name) : 'no method'}</Card.Text>
        </Card.Body>
      </Card>
      <ChooseMethodModal show={show} handleClose={handleClose} handleReset={handleReset} handleKeep={handleKeep} />
    </>
  );
}
ChooseMethodCard.propTypes = {
  recipeObj: PropTypes.shape({
    method_id: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.number,
  }).isRequired,
};
