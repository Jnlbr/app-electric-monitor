import fetchApi from '../../utils/fetchApi';

export default async ({ year, month }, token) => {
  const options = {
    method: 'get',
    credentials: 'include',
    headers: {
      'x-access-token': token
    },
    endpoint: `/hardware/params/getAll/${year}/${month}`
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
      PACKAGE: api/general/months
      METHOD: default
      ERROR: ${err}
    `);
    throw err;
  }
}