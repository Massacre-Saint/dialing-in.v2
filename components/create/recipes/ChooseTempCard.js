import { useRouter } from 'next/router';
import React from 'react';
import Card from 'react-bootstrap/Card';

export default function ChooseTempCard() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/water/chooseTemp');
  };
  return (
    <Card style={{ width: 'auto' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>Choose Water Temp</Card.Title>
        <Card.Text />
      </Card.Body>
    </Card>
  );
}
