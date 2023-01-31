/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Method, MainNavBar } from '../components';
import { getMethods } from '../utils/data/apiData/methods';
import { useAuth } from '../utils/context/authContext';
import { createRecipe, getRecipe } from '../utils/data/apiData/recipes';
import { createOwnerRecipe } from '../utils/data/apiData/owner';

export default function Methods() {
  const { user } = useAuth();
  const router = useRouter();
  const [methods, setMethods] = useState([]);
  const getAllMethods = () => {
    getMethods().then(setMethods);
  };
  const handleClick = () => {
    if (!user) {
      router.push('/settings');
    } else {
      createRecipe().then((recipeObj) => {
        getRecipe(recipeObj.id).then((obj) => {
          createOwnerRecipe(obj, user).then(() => {
            router.push(`/create/recipes/${obj.id}`);
          });
        });
      });
    }
  };
  useEffect(() => {
    getAllMethods();
  }, [user]);
  return (
    <>
      <Navbar fixed="top" className="navbar">
        <div className="page-title">
          Dialing In
        </div>
        <Nav.Link onClick={handleClick} className="nav-cta">
          <IoIosAddCircleOutline />
        </Nav.Link>
      </Navbar>
      <div>
        <div className="method-container">
          {methods.map((i) => (
            <Method key={i.id} methodObj={i} />
          ))}
        </div>
      </div>
      <MainNavBar />
    </>
  );
}
