/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getMethods } from '../utils/data/apiData/methods';
import Method from '../components/read/Method';
import MainNavbar from '../components/MainNavBar';
import { useAuth } from '../utils/context/authContext';
import { createRecipe, getRecipe } from '../utils/data/apiData/userRecipes';

export default function Methods() {
  const { user } = useAuth();
  const router = useRouter();
  const [methods, setMethods] = useState([]);
  const getAllMethods = () => {
    getMethods().then(setMethods);
  };
  const handleClick = () => {
    const payload = {
      uid: user.uid,
      methodId: '',
    };
    if (!user) {
      router.push('/settings');
    } else {
      createRecipe(payload).then((recipeObj) => {
        getRecipe(recipeObj.data.firebaseKey).then((obj) => {
          router.push(`/create/recipes/${obj.firebaseKey}`);
        });
      });
    }
  };
  useEffect(() => {
    getAllMethods();
  }, [user]);
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Image
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Dialing In
          </Navbar.Brand>
          <Nav.Link onClick={handleClick}>
            <IoIosAddCircleOutline />
          </Nav.Link>
        </Container>
      </Navbar>
      <div>
        <div>
          {methods.map((i) => (
            <Method key={i.firebaseKey} methodObj={i} />
          ))}
        </div>
      </div>
      <MainNavbar />
    </>
  );
}
