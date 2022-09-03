import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { getRecipeGrind } from '../../../utils/data/apiData/mergeData';

export default function ChooseGrindCard({ recipeObj }) {
  const router = useRouter();
  const [grind, setGrind] = useState({});
  const handleClick = () => {
    router.push({
      pathname: '/create/recipes/grind/chooseGrind',
      query: { data: recipeObj.firebaseKey },
    });
  };
  useEffect(() => {
    if (recipeObj.grindId) {
      getRecipeGrind(recipeObj.firebaseKey).then((grindObj) => {
        setGrind(grindObj);
      });
    }
  }, [recipeObj]);
  return (
    <Card style={{ width: 'auto' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>Grind and Dose:</Card.Title>
        <Card.Text>{grind ? (grind?.grindObject?.grindSize) : 'no method'}</Card.Text>
        <Card.Text>{recipeObj.dose}g</Card.Text>
      </Card.Body>
    </Card>
  );
}

ChooseGrindCard.propTypes = {
  recipeObj: PropTypes.shape({
    methodId: PropTypes.string,
    firebaseKey: PropTypes.string,
    grindId: PropTypes.string,
    dose: PropTypes.number,
  }),
};
ChooseGrindCard.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    methodId: '',
    grindId: '',
    dose: 0,
  }),
};
