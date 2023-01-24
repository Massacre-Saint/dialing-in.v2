import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getRecipeEquipment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/recipe_equip?recipeId=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const getUserRecipeEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/recipeEquipment.json?orderBy="recipeId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const getSingleEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/recipeEquipment/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
const deleteEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/recipeEquipment/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const updateEquipment = (firebaseKey, payload) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/recipeEquipment/${firebaseKey}.json`, payload)
    .then(resolve)
    .catch(reject);
});
const createEquipment = (equipObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/recipeEquipment.json`, equipObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/recipeEquipment/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

export {
  getRecipeEquipment, getSingleEquipment, deleteEquipment, updateEquipment, createEquipment, getUserRecipeEquipment,
};
