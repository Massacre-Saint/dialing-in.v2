/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useAuth } from '../../../../utils/context/authContext';
import { getGrinds } from '../../../../utils/data/apiData/grind';
import Grind from '../../../../components/read/Grind';

export default function ChooseMethod() {
  const { user } = useAuth();
  const router = useRouter();
  const [grinds, setGrinds] = useState([]);
  const handleClick = (router.back);

  useEffect(() => {
    getGrinds().then(setGrinds);
  }, [user]);

  return (
    <>
      <Navbar sticky="top" bg="light">
        <Nav.Link onClick={handleClick}>
          Go back
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            Choose Grind
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        <div>
          {grinds.map((i) => (
            <Grind key={i.firebaseKey} grindObj={i} />
          ))}
        </div>
      </div>
    </>
  );
}
