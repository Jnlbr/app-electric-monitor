import fetchApi from '../../utils/fetchApi';

/**
 * @param token
 */
export default async (form, token) => {
  const options = {
    method: 'put',
    headers: {
      "x-access-token": token,
    },
    credentials: 'include',
    body: form,
    endpoint: '/register/token'
  }
  try {
    const data = await fetchApi(options);
    if(data) {
      return data;
    } else {
      return null;
    }
  } catch(err) {
    throw err;
  }
}