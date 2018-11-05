import { removeItem } from '../../utils/storage';

export default async () => {
  try {
    await removeItem('token');
    return;    
  } catch(err) {
    throw err;
  }
}