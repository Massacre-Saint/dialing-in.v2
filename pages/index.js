import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { getMethods } from '../utils/data/apiData/methods';
import Method from '../components/Method';
import { useAuth } from '../utils/context/authContext';

export default function Methods() {
  const { user } = useAuth();
  const [methods, setMethods] = useState([]);
  const getAllMethods = () => {
    getMethods().then(setMethods);
  };
  useEffect(() => {
    getAllMethods();
  }, [user]);
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Dialing In
          </Navbar.Brand>
          <Nav.Link href="/">
            <IoIosAddCircleOutline />
          </Nav.Link>
        </Container>
      </Navbar>
      <div>
        <div>
          {methods.map((i) => (
            <Method key={i.fbKey} methodObj={i} />
          ))}
        </div>
      </div>
    </>
  );
}
