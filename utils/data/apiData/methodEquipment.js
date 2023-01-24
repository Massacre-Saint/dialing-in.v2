import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getMethodEquipment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/method_equip?methodId=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

export default getMethodEquipment;
