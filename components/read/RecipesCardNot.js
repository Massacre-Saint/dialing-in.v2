/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteRecipeSteps, deleteUserRecipeEquipment } from '../../utils/data/apiData/mergeData';
import { deleteProcess } from '../../utils/data/apiData/process';

export default function RecipesCardNot({ recipeObj, render }) {
  const router = useRouter();
  const convertTime = (total) => {
    if (total >= 3600) {
      const result = new Date(total * 1000).toISOString().slice(11, 19);
      return result;
    }
    const result = new Date(total * 1000).toISOString().slice(14, 19);
    return result;
  };
  const handleClick = (e) => {
    if (e.target.type === 'button') {
      deleteUserRecipeEquipment(recipeObj.firebaseKey);
      deleteRecipeSteps(recipeObj.firebaseKey).then(() => {
        deleteProcess(recipeObj.processId);
        render();
      });
    } else {
      router.push(`/create/process/${recipeObj.firebaseKey}`);
    }
  };
  useEffect(() => [recipeObj]);
  return (
    <>
      <Card style={{ width: 'auto' }} onClick={handleClick}>
        <Card.Body>
          <Card.Title>{recipeObj.recipeName}</Card.Title>
          <Card.Text />
          <div>
            <span>{convertTime(recipeObj.brewTime)} </span>
            <span>{recipeObj.dose}g </span>
            <span>{recipeObj.weight}g</span>
          </div>
          {
            recipeObj.uid && router.pathname('/read/recipes/[firebaseKey')
              ? (
                <button onClick={handleClick} type="button">Delete</button>
              )
              : (
                ''
              )
            }
        </Card.Body>
      </Card>
    </>
  );
}

RecipesCardNot.propTypes = {
  recipeObj: PropTypes.shape(
    {
      brewTime: PropTypes.number,
      grindId: PropTypes.string,
      weight: PropTypes.number,
      methodId: PropTypes.string,
      recipeName: PropTypes.string,
      dose: PropTypes.number,
      waterTemp: PropTypes.number,
      favorite: PropTypes.bool,
      completed: PropTypes.bool,
      firebaseKey: PropTypes.string,
      uid: PropTypes.string,
      processId: PropTypes.string,
    },
  ),
  render: PropTypes.func,
};
RecipesCardNot.defaultProps = {
  recipeObj: PropTypes.shape(
    {
      brewTime: 0,
      grindId: '',
      weight: 0,
      methodId: '',
      recipeName: '',
      dose: 0,
      waterTemp: 0,
      favorite: false,
      completed: false,
      firebaseKey: '',
      uid: '',
      processId: '',
    },
  ),
  render: () => {},
};
