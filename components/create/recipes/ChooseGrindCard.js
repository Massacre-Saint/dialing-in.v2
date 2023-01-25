import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function ChooseGrindCard({ recipeObj }) {
  const router = useRouter();
  const [grind, setGrind] = useState({});
  const handleClick = () => {
    router.push({
      pathname: '/create/recipes/grind/chooseGrind',
      query: { data: recipeObj.id },
    });
  };
  useEffect(() => {
    if (recipeObj.grindId) {
      setGrind(recipeObj.grindId);
    }
  }, [recipeObj]);
  return (
    <Card style={{ width: 'auto' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>Grind and Dose:</Card.Title>
        <Card.Text>{grind ? (grind.grind_size) : 'no method'}</Card.Text>
        <Card.Text>{recipeObj.dose}g</Card.Text>
      </Card.Body>
    </Card>
  );
}

ChooseGrindCard.propTypes = {
  recipeObj: PropTypes.shape({
    id: PropTypes.number,
    grindId: PropTypes.shape({

    }),
    dose: PropTypes.number,
  }).isRequired,
};
