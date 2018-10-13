import { createSwitchNavigator } from 'react-navigation';
// import AuthRoutes from './auth';
import UserRoutes from './user';
import { LoadingScreen } from '../screens';

export default createSwitchNavigator(
  {
    UserRoutes: UserRoutes,    
    // AuthRoutes: AuthRoutes,
    Loading: LoadingScreen,
  }, {
    headerMode: 'none',
    initialRouteName: 'Loading',
  }
);