import axios from 'axios';
import { getSingleMethod } from './methods';
import { getDefaultRecipe, getDefaultRecipesByMethod } from './defaultRecipes';
import { deleteRecipe, getRecipe } from './userRecipes';
import { getUser } from './userData';
import { getSingleGrind } from './grind';
import { deleteStep, getSteps } from './steps';
import { clientCredentials } from '../../client';
import { deleteEquipment, getRecipeEquipment } from './recipeEquipment';
import getMethodEquipment from './methodEquipment';

const dbUrl = clientCredentials.databaseURL;
const getMethodRecipesDefault = (methodfirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMethod(methodfirebaseKey), getDefaultRecipesByMethod(methodfirebaseKey)])
    .then(([methodObj, defaultRecipesArray]) => {
      resolve({ ...methodObj, defaultRecipes: defaultRecipesArray });
    }).catch((error) => reject(error));
});
const deleteRecipeEquipment = (recipeId) => new Promise((resolve, reject) => {
  getRecipeEquipment(recipeId).then((equipArray) => {
    const deleteEquipPromises = equipArray.map((equip) => deleteEquipment(equip.firebaseKey));
    Promise.all(deleteEquipPromises).then(() => {
      deleteRecipe(recipeId).then(resolve);
    });
  }).catch((error) => reject(error));
});
const getSingleRecipeMethod = (recipefirebaseKey) => new Promise((resolve, reject) => {
  getRecipe(recipefirebaseKey).then((recipeObj) => {
    getSingleMethod(recipeObj.methodId).then((methodObj) => {
      resolve({ methodObj, ...recipeObj });
    }).catch((error) => reject(error));
  });
});
const getSingleRecipeUser = (firebaseKey) => new Promise((resolve, reject) => {
  getRecipe(firebaseKey).then((recipeObj) => {
    getUser(recipeObj.uid).then((userObject) => {
      resolve({ userObject, ...recipeObj });
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
            getRecipeEquipment(recipeObj.firebaseKey).then((recipe) => resolve({ method, recipe }));
          });
        });
      } else {
        getDefaultRecipe(firebaseKey).then((recipeObj) => {
          getMethodEquipment(recipeObj.methodId).then((method) => {
            getRecipeEquipment(recipeObj.firebaseKey).then((recipe) => resolve({ method, recipe }));
          });
        });
      }
    })
    .catch((error) => reject(error));
});

export {
  getMethodRecipesDefault, getSingleRecipeMethod, getSingleRecipeUser, getRecipeGrind, getAllData, deleteRecipeSteps, getAllSteps, deleteRecipeEquipment, getAllEquipment,
};
