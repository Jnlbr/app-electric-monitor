import { createDrawerNavigator } from 'react-navigation';
import { Drawer } from '../../components';
import {
  HomeScreen,
  MonitorScreen,
  DeviceManagerScreen,
  DeviceScreen,
} from '../../screens';

export default createDrawerNavigator(
  {
    Home: HomeScreen,
    Monitor: MonitorScreen,
    Device: DeviceScreen,
    DeviceManager: DeviceManagerScreen
  }, {
    initialRouteName:'Home',
    contentComponent: Drawer
  }
)