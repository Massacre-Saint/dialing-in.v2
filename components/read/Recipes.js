import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function Recipes({ recipeObj }) {
  const convertTime = (total) => {
    const totalSeconds = total;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    const num = `${minutes}:${seconds}`;
    return num;
  };
  return (
    <>
      <Card style={{ width: 'auto' }}>
        <Card.Body>
          <Card.Title>{recipeObj.recipeName}</Card.Title>
          <Card.Text />
          <div>
            <span>{convertTime(recipeObj.brewTime)} </span>
            <span>{recipeObj.dose}g </span>
            <span>{recipeObj.amount}g</span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

Recipes.propTypes = {
  methodObj: PropTypes.shape(
    {
      defaultRecipes: PropTypes.arrayOf(PropTypes.shape({
        fbKey: PropTypes.string,
        brewTime: PropTypes.number,
        grindId: PropTypes.string,
        amount: PropTypes.number,
        methodId: PropTypes.string,
        recipeName: PropTypes.string,
        dose: PropTypes.number,
        waterTemp: PropTypes.number,
        favorite: PropTypes.bool,
      })),
      fbKey: PropTypes.string,
      imageUrl: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
    },
  ),
  recipeObj: PropTypes.shape(
    {
      fbKey: PropTypes.string,
      brewTime: PropTypes.number,
      grindId: PropTypes.string,
      amount: PropTypes.number,
      methodId: PropTypes.string,
      recipeName: PropTypes.string,
      dose: PropTypes.number,
      waterTemp: PropTypes.number,
      favorite: PropTypes.bool,
    },
  ),
};
Recipes.defaultProps = {
  methodObj: PropTypes.shape(
    {
      defaultRecipes: PropTypes.arrayOf(PropTypes.shape({
        fbKey: '',
        brewTime: 0,
        grindId: '',
        amount: 0,
        methodId: '',
        recipeName: '',
        dose: 0,
        waterTemp: 0,
        favorite: false,
      })),
      fbKey: '',
      imageUrl: '',
      description: '',
      name: '',
    },
  ),
  recipeObj: PropTypes.shape(
    {
      fbKey: '',
      brewTime: 0,
      grindId: '',
      amount: 0,
      methodId: '',
      recipeName: '',
      dose: 0,
      waterTemp: 0,
      favorite: false,
    },
  ),
};
