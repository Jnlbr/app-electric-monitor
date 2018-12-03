import fetchApi from '../../utils/fetchApi';

export default async (id, token) => {
  const options = {
    method: 'get',
    credentials: 'include',
    headers: {
      'x-access-token': token
    },
    endpoint: '/hardware/params/get/month/' + id
  }
  try {
    const data = await fetchApi(options);
    if(data) {
      return data;
    } else {
      return null;
    }
  } catch(err) {
    console.log('Api: getMonth error: ');
    console.log(err);
    throw err;
  }
}