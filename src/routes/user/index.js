import { createDrawerNavigator,createStackNavigator } from 'react-navigation';
import { Drawer } from '../../components';
import {
  HomeScreen 
} from '../../screens';

export default createStackNavigator(
  {
    Home: HomeScreen,
  }, {
    initialRouteName:'Home'
    // contentComponent: Drawer
  }
)