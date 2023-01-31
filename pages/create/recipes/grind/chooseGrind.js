/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useAuth } from '../../../../utils/context/authContext';
import { getGrinds } from '../../../../utils/data/apiData/grind';
import { Grind } from '../../../../components';
import { getRecipe } from '../../../../utils/data/apiData/recipes';

export default function ChooseMethod() {
  const { user } = useAuth();
  const router = useRouter();
  const id = router.query.data;
  const [grinds, setGrinds] = useState([]);
  const [recipe, setRecipe] = useState({});
  const handleClick = (router.back);
  useEffect(() => {
    getGrinds().then(setGrinds);
    getRecipe(id).then(setRecipe);
  }, [user]);
  return (
    <>
      <Navbar sticky="top" className="navbar">
        <Nav.Link onClick={handleClick}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Choose Grind
        </div>
      </Navbar>
      <div className="grinds-page">
        <div className="grinds">
          {grinds.map((i) => (
            <Grind key={i.id} grindObj={i} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
