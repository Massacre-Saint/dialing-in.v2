import { useRouter } from 'next/router';
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function ChooseGrindCard({ recipeObj }) {
  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: '/create/recipes/grind/chooseGrind',
      query: { data: recipeObj.firebaseKey },
    });
  };
  return (
    <Card style={{ width: 'auto' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>Choose Grind</Card.Title>
        <Card.Text />
      </Card.Body>
    </Card>
  );
}

ChooseGrindCard.propTypes = {
  recipeObj: PropTypes.shape({
    methodId: PropTypes.string,
    firebaseKey: PropTypes.string,
    grindId: PropTypes.string,
  }),
};
ChooseGrindCard.defaultProps = {
  recipeObj: PropTypes.shape({
    firebaseKey: '',
    methodId: '',
    grindId: '',
  }),
};
