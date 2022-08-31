import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function Recipes({ recipeObj }) {
  return (
    <>
      <Card style={{ width: 'auto' }}>
        <Card.Body>
          <Card.Title>{recipeObj.recipeName}</Card.Title>
          <Card.Text />
          <div>
            <span>{recipeObj.brewTime}</span>
            <span>{recipeObj.dose}</span>
            <span>{recipeObj.amount}</span>
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
