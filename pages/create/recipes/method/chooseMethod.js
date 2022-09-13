/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import {
  Navbar, Nav,
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    deleteRecipe(firebaseKey).then(() => {
      router.push('/');
    });
  };
  useEffect(() => {
    getRecipe(firebaseKey).then(setUserRecipe);
    getMethods().then(setMethods);
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleShow}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Choose Method
        </div>
      </Navbar>
      <div>
        <div>
          {methods.map((i) => (
            <Method key={i.firebaseKey} methodObj={i} />
          ))}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton />
        <Modal.Body>Going back will delete recipe. Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
