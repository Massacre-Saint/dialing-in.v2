import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const deleteRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/userRecipes/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});
export  default deleteRecipe
