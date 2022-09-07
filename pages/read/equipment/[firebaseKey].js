/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import MethodEquipCard from '../../../components/read/MethodEquipCard';
import EquipmentCard from '../../../components/read/EquipmentCard';
import { getAllEquipment } from '../../../utils/data/apiData/mergeData';
import EquipmentModal from '../../../components/modal/EquipmentModal';

export default function ShowEquip() {
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;
  const [recipe, setRecipe] = useState({});
  const [methodEquip, setMethodEquip] = useState([]);
  const [recipeEquip, setRecipeEquip] = useState([]);
  console.warn(firebaseKey);
  const renderEquipment = () => {
    getAllEquipment(firebaseKey).then((obj) => {
      console.warn(obj);
      setRecipe(obj);
      setRecipeEquip(obj.recipe);
      setMethodEquip(obj.method);
    });
  };

  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    renderEquipment();
  }, [user]);
  return (
    <>
      <Navbar>
        <Nav.Link onClick={handleBack}>
          Back
        </Nav.Link>
        <Container>
          <Navbar.Brand>
            Equipment
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        <h2>Method Equipment</h2>
        <div>
          {methodEquip.map((obj) => (
            <MethodEquipCard key={obj.firebaseKey} obj={obj} />
          ))}
        </div>
        <div>
          <h2>Recipe Equipment</h2>
          <div>
            {recipeEquip.map((obj) => (
              <EquipmentCard key={obj.firebaseKey} onUpdate={renderEquipment} obj={obj} />
            ))}
          </div>
        </div>
        <div>
          {
            recipe.uid !== user.uid
              ? (
                ''
              )
              : (
                <EquipmentModal recipe={recipe} recipeEquip={recipeEquip} onUpdate={renderEquipment} />
              )
          }
        </div>
      </div>

    </>
  );
}
