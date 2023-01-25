import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function ChooseGrindCard({ recipeObj }) {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: '/create/recipes/grind/chooseGrind',
      query: { data: recipeObj.id },
    });
  };
  useEffect(() => {
  }, [recipeObj]);
  return (
    <Card style={{ width: 'auto' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>Grind and Dose:</Card.Title>
        <Card.Text>{recipeObj.grind_id ? (recipeObj.grind_id.grind_size) : 'no grid size selected'}</Card.Text>
        <Card.Text>{recipeObj.dose}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ChooseGrindCard.propTypes = {
  recipeObj: PropTypes.shape({
    id: PropTypes.number,
    grind_id: PropTypes.shape({
      grind_size: PropTypes.string,
    }),
    dose: PropTypes.number,
  }).isRequired,
};
