/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Navbar, Nav,
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
  const sortedGrinds = grinds.sort((a, b) => ((a.order > b.order) ? 1 : -1));
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
          {sortedGrinds.map((i) => (
            <Grind key={i.firebaseKey} grindObj={i} />
          ))}
        </div>
      </div>
    </>
  );
}
