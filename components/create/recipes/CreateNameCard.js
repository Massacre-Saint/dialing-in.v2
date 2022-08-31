import { useRouter } from 'next/router';
import React from 'react';
import Card from 'react-bootstrap/Card';

export default function CreateNameCard() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/recipes/createrecipe');
  };
  return (
    <Card style={{ width: 'auto' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>Create Recipe Name</Card.Title>
        <Card.Text />
      </Card.Body>
    </Card>
  );
}
