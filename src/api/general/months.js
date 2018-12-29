import fetchApi from '../../utils/fetchApi';

export default async (token) => {
  const options = {
    method: 'get',
    credentials: 'include',
    headers: {
      'x-access-token': token
    },
    endpoint: '/hardware/params/getAll/month'
  }
  try {
    const data = await fetchApi(options);
    if (data) {
      console.log(`
        PACKAGE: api/general/record
        METHOD: default
        BODY: ${data}
      `);
      return data;
    } else {
      throw 'Null value received';
    }
  } catch (err) {
    console.log(`
      PACKAGE: api/general/record
      METHOD: default
      ERROR: ${err}
    `);
    throw err;
  }
}