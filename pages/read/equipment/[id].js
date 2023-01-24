/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import MethodEquipCard from '../../../components/read/MethodEquipCard';
import EquipmentCard from '../../../components/read/EquipmentCard';
import EquipmentModal from '../../../components/modal/EquipmentModal';
import { getRecipe } from '../../../utils/data/apiData/recipes';
import getMethodEquipment from '../../../utils/data/apiData/methodEquipment';
import { getRecipeEquipment } from '../../../utils/data/apiData/recipeEquipment';

export default function ShowEquip() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [recipe, setRecipe] = useState({});
  const [methodEquip, setMethodEquip] = useState([]);
  const [recipeEquip, setRecipeEquip] = useState([]);
  const renderEquipment = () => {
    getRecipe(id).then(setRecipe);
    getMethodEquipment(id).then(setMethodEquip);
    getRecipeEquipment(id).then(setRecipeEquip);
  };

  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    renderEquipment();
  }, [user]);
  return (
    <>
      <Navbar className="navbar">
        <Nav.Link onClick={handleBack}>
          <button className="btn-sm" type="button">&#8249; Back</button>
        </Nav.Link>
        <div className="page-title">
          Equipment
        </div>
      </Navbar>
      <div className="recipe-equip-header">
        <h2>Method Equipment</h2>
        <div className="cards-container">
          {methodEquip.map((obj) => (
            <MethodEquipCard key={obj.id} obj={obj} />
          ))}
        </div>
        {recipeEquip.length
          ? (
            <>
              <div className="recipe-equip-header">
                <h2>Recipe Equipment</h2>
                <div className="steps">
                  {recipeEquip.map((obj) => (
                    <EquipmentCard key={obj.id} onUpdate={renderEquipment} recipe={recipe} obj={obj} />
                  ))}
                </div>
              </div>
              <div>
                <EquipmentModal recipe={recipe} recipeEquip={recipeEquip} onUpdate={renderEquipment} />
              </div>
            </>
          )
          : (
            <EquipmentModal recipe={recipe} recipeEquip={recipeEquip} onUpdate={renderEquipment} />
          )}
      </div>

    </>
  );
}
