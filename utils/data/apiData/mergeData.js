import axios from 'axios';
import { getSingleMethod } from './methods';
import { getDefaultRecipe } from './defaultRecipes';
import { deleteRecipe, getRecipe, getUserRecipesByMethod } from './userRecipes';
import { getUser } from './userData';
import { getSingleGrind } from './grind';
import { deleteStep, getSteps } from './steps';
import { clientCredentials } from '../../client';
import { deleteEquipment, getRecipeEquipment, getUserRecipeEquipment } from './recipeEquipment';
import getMethodEquipment from './methodEquipment';

const dbUrl = clientCredentials.databaseURL;

const getMethodRecipesUser = (methodFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMethod(methodFirebaseKey),
    getUserRecipesByMethod(methodFirebaseKey)])
    .then(([methodObj, userRecipesArray]) => {
      resolve({ ...methodObj, userRecipes: userRecipesArray });
    }).catch((error) => reject(error));
});
const deleteUserRecipeEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  getUserRecipeEquipment(firebaseKey).then((equipArray) => {
    const deleteEquipPromises = equipArray.map((equip) => deleteEquipment(equip.firebaseKey));
    Promise.all(deleteEquipPromises).then(resolve);
  }).catch((error) => reject(error));
});

const getSingleRecipeMethod = (recipefirebaseKey) => new Promise((resolve, reject) => {
  getRecipe(recipefirebaseKey).then((recipeObj) => {
    getSingleMethod(recipeObj.methodId).then((methodObj) => {
      resolve({ methodObj, ...recipeObj });
    }).catch((error) => reject(error));
  });
});

const getRecipeGrind = (firebaseKey) => new Promise((resolve, reject) => {
  getRecipe(firebaseKey).then((recipeObj) => {
    getSingleGrind(recipeObj.grindId).then((grindObject) => {
      resolve({ grindObject, ...recipeObj });
    }).catch((error) => reject(error));
  });
});

const getAllData = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userRecipes/${firebaseKey}.json`)
    .then((response) => {
      if (response.data) {
        getRecipe(firebaseKey).then((recipeObj) => {
          getSingleMethod(recipeObj.methodId).then((methodObject) => {
            getSingleGrind(recipeObj.grindId).then((grindObject) => {
              getUser(recipeObj.uid).then((userObject) => {
                resolve({
                  ...recipeObj, methodObject, grindObject, userObject,
                });
              });
            });
          });
        });
      } else {
        getDefaultRecipe(firebaseKey).then((recipeObj) => {
          getSingleMethod(recipeObj.methodId).then((methodObject) => {
            getSingleGrind(recipeObj.grindId).then((grindObject) => {
              resolve({
                ...recipeObj, methodObject, grindObject,
              });
            });
          });
        });
      }
    })
    .catch((error) => reject(error));
});

const deleteRecipeSteps = (recipeId) => new Promise((resolve, reject) => {
  getSteps(recipeId).then((stepsArray) => {
    const deleteItemPromises = stepsArray.map((steps) => deleteStep(steps.firebaseKey));
    Promise.all(deleteItemPromises).then(() => {
      deleteRecipe(recipeId).then(resolve);
    });
  }).catch((error) => reject(error));
});
const getAllSteps = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userRecipes/${firebaseKey}.json`)
    .then((response) => {
      if (response.data) {
        getRecipe(firebaseKey).then((recipeObj) => {
          getSteps(recipeObj.firebaseKey).then((array) => resolve({ ...recipeObj, stepArry: array }));
        });
      } else {
        getDefaultRecipe(firebaseKey).then((recipeObj) => {
          getSteps(recipeObj.firebaseKey).then((array) => resolve({ ...recipeObj, stepArry: array }));
        });
      }
    })
    .catch((error) => reject(error));
});
const getAllEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/userRecipes/${firebaseKey}.json`)
    .then((response) => {
      if (response.data) {
        getRecipe(firebaseKey).then((recipeObj) => {
          getMethodEquipment(recipeObj.methodId).then((method) => {
            getRecipeEquipment(recipeObj.firebaseKey).then((recipe) => resolve({ ...recipeObj, method, recipe }));
          });
        });
      } else {
        getDefaultRecipe(firebaseKey).then((recipeObj) => {
          getMethodEquipment(recipeObj.methodId).then((method) => {
            getRecipeEquipment(recipeObj.firebaseKey).then((recipe) => resolve({ ...recipeObj, method, recipe }));
          });
        });
      }
    })
    .catch((error) => reject(error));
});

export {
  getSingleRecipeMethod, getRecipeGrind, getAllData, deleteRecipeSteps, getAllSteps, deleteUserRecipeEquipment, getAllEquipment, getMethodRecipesUser,
};
