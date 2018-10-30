import { getItem } from '../../utils/storage';
import fetchApi from '../../utils/fetchApi';

export default async () => {
  try {
    const token = await getItem('token');
    console.log(token)
    if(token) {
      const options = {
        method: 'get',
        headers: {
          'x-access-token': token,
        },
        endpoint: '/auth/verify'
      }
      let data = await fetchApi(options);
      if(data) {
        return { token, data };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch(err) {
    throw err;
  }
}