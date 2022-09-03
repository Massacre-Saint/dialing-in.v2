import { getSingleMethod } from './methods';
import getDefaultRecipesByMethod from './defaultRecipes';
import { deleteRecipe, getRecipe } from './userRecipes';
import { getUser } from './userData';
import { getSingleGrind } from './grind';
import { deleteStep, getSteps } from './steps';

const getMethodRecipesDefault = (methodfirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMethod(methodfirebaseKey), getDefaultRecipesByMethod(methodfirebaseKey)])
    .then(([methodObj, defaultRecipesArray]) => {
      resolve({ ...methodObj, defaultRecipes: defaultRecipesArray });
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
const getAllData = (firebaseKey) => new Promise((resolve, recject) => {
  getRecipe(firebaseKey).then((recipeObj) => {
    getSingleMethod(recipeObj.methodId).then((methodObject) => {
      getSingleGrind(recipeObj.grindId).then((grindObject) => {
        getUser(recipeObj.uid).then((userObject) => {
          resolve({
            ...recipeObj, methodObject, grindObject, userObject,
          });
        }).catch((error) => recject(error));
      });
    });
  });
});
const deleteRecipeSteps = (recipeId) => new Promise((resolve, reject) => {
  getSteps(recipeId).then((stepsArray) => {
    const deleteItemPromises = stepsArray.map((steps) => deleteStep(steps.firebaseKey));
    Promise.all(deleteItemPromises).then(() => {
      deleteRecipe(recipeId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  getMethodRecipesDefault, getSingleRecipeMethod, getSingleRecipeUser, getRecipeGrind, getAllData, deleteRecipeSteps,
};
