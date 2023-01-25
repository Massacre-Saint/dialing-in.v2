import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getMethods = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/methods`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleMethod = (methodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/methods/${methodId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
export { getMethods, getSingleMethod };
