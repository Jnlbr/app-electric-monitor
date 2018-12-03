import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Drawer } from '../../components';
import {
  HomeScreen,
  MonitorScreen,
  DeviceManagerScreen,
  DeviceScreen,
} from '../../screens';

const deviceRouter = createStackNavigator(
  {
    DeviceManager: {
      screen: DeviceManagerScreen,
    },
    Device: {
      screen: DeviceScreen,
    },
  }, {
    initialRouteName: 'DeviceManager',    
  }
)

export default createDrawerNavigator(
  {
    Home: HomeScreen,
    Monitor: MonitorScreen,
    DeviceManager: deviceRouter
  }, {
    initialRouteName:'Home',
    contentComponent: Drawer
  }
)