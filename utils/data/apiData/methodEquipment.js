import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getMethodEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/methodEquipment.json?orderBy="methodId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export default getMethodEquipment;
