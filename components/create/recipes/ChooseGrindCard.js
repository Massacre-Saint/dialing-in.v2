import { useRouter } from 'next/router';
import React from 'react';
import Card from 'react-bootstrap/Card';

export default function ChooseGrindCard() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/grind/chooseGrind');
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
