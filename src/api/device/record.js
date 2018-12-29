import fetchApi from '../../utils/fetchApi';

/**
 * @param {id, year, month}
 * @token
 */
export default async ({ id, year, month }, token) => {
  const options = {
    method: 'get',
    credentials: 'include',
    headers: {
      'x-access-token': token
    },
    endpoint: `/hardware/params/get/${id}/${year}/${month}`
  }
  try {
    const data = await fetchApi(options);
    if (data) {
      return data;
    } else {
      throw 'Null value received';
    }
  } catch (err) {
    console.log(`
      PACKAGE: api/device/record.js
      METHOD: default
      ERROR: ${err}
    `);
    throw err;
  }
}