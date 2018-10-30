import { createDrawerNavigator } from 'react-navigation';
import { Drawer } from '../../components';
import {
  HomeScreen
} from '../../screens';

export default createDrawerNavigator(
  {
    Home: HomeScreen,
  }, {
    initialRouteName:'Home',
    contentComponent: Drawer
  }
)