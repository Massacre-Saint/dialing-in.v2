/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteRecipeSteps } from '../../utils/data/apiData/mergeData';
import { deleteProcess } from '../../utils/data/apiData/process';

export default function Recipes({ recipeObj, render }) {
  const router = useRouter();
  const convertTime = (total) => {
    const totalSeconds = total;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    const num = `${minutes}:${seconds}`;
    return num;
  };
  const handleClick = (e) => {
    if (e.target.type === 'button') {
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
      {
        recipeObj.completed === false
          ? (
            <Card
              id="card"
              style={{ width: 'auto' }}
              onClick={handleClick}
            >
              <Card.Body>
                <Card.Title>{recipeObj.recipeName}</Card.Title>
                <div>
                  <p>Choose to to finish recipe</p>
                </div>
                {
                  recipeObj.uid
                    ? (
                      <button onClick={handleClick} type="button">Delete</button>
                    )
                    : (
                      ''
                    )
                }
                <Card.Text />
              </Card.Body>
            </Card>
          )
          : (
            <Card style={{ width: 'auto' }} onClick={handleClick}>
              <Card.Body>
                <Card.Title>{recipeObj.recipeName}</Card.Title>
                <Card.Text />
                <div>
                  <span>{convertTime(recipeObj.brewTime)} </span>
                  <span>{recipeObj.dose}g </span>
                  <span>{recipeObj.amount}g</span>
                </div>
                {
                  recipeObj.uid
                    ? (
                      <button onClick={handleClick} type="button">Delete</button>
                    )
                    : (
                      ''
                    )
                }
              </Card.Body>
            </Card>
          )
      }
    </>
  );
}

Recipes.propTypes = {
  recipeObj: PropTypes.shape(
    {
      brewTime: PropTypes.number,
      grindId: PropTypes.string,
      amount: PropTypes.number,
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
Recipes.defaultProps = {
  recipeObj: PropTypes.shape(
    {
      brewTime: 0,
      grindId: '',
      amount: 0,
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
