import { getSingleMethod } from './methods';
import getDefaultRecipesByMethod from './defaultRecipes';

const getMethodRecipesDefault = (methodFbKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMethod(methodFbKey), getDefaultRecipesByMethod(methodFbKey)])
    .then(([methodObj, defaultRecipesArray]) => {
      resolve({ ...methodObj, defaultRecipes: defaultRecipesArray });
    }).catch((error) => reject(error));
});

export default getMethodRecipesDefault;
