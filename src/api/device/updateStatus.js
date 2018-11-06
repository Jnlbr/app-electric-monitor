import fetchApi from '../../utils/fetchApi';

/**
 * @param token
 */
export default async (form,token) => {
  console.log(form)
  console.log(token)
  const options = {
    method: 'put',
    credentials: 'include',
    body: form,
    headers: {
      'x-access-token': token
    },
    endpoint: '/device/update/status'
  }
  try {
    const data = await fetchApi(options);
    if(data) {
      console.log(data)
      return data;
    } else {
      return null;
    }
  } catch(err) {
    console.log('Api: updateStatus error: ');
    console.log(err);
    throw err;
  }
}