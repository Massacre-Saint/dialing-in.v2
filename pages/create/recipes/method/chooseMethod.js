/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useAuth } from '../../../../utils/context/authContext';
import { deleteRecipe, getRecipe } from '../../../../utils/data/apiData/userRecipes';
import { getMethods } from '../../../../utils/data/apiData/methods';
import Method from '../../../../components/create/Method';

export default function ChooseMethod() {
  const { user } = useAuth();
  const router = useRouter();
  const firebaseKey = router.query.data;
  const [, setUserRecipe] = useState({});
  const [methods, setMethods] = useState([]);
  const handleDelete = () => {
    if (window.confirm('Do you wish to cancel recipe?')) {
      deleteRecipe(firebaseKey).then(() => {
        router.push('/');
      });
    }
  };
  useEffect(() => {
    getRecipe(firebaseKey).then(setUserRecipe);
    getMethods().then(setMethods);
  }, [user]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={handleDelete}>
          Go back
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            Choose Method
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        <div>
          {methods.map((i) => (
            <Method key={i.firebaseKey} methodObj={i} />
          ))}
        </div>
      </div>
    </>
  );
}
