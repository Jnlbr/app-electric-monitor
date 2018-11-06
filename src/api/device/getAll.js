import fetchApi from '../../utils/fetchApi';

/**
 * @param token
 */
export default async (token) => {
  const options = {
    method: 'get',
    credentials: 'include',
    headers: {
      'x-access-token': token
    },
    endpoint: '/device/get/all'
  }
  try {
    const data = await fetchApi(options);
    if(data) {
      return data;
    } else {
      return null;
    }
  } catch(err) {
    console.log('Api: getAll error: ');
    console.log(err);
    throw err;
  }
}