import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Drawer } from '../../components';
import {
  HomeScreen,
  MonitorScreen,
  DeviceManagerScreen,
  DeviceScreen,
  ConfigurationScreen,
  AddDeviceScreen
} from '../../screens';

const Stack = createStackNavigator(
{
    DeviceManager: {
      screen: DeviceManagerScreen,
    },
    AddDevice: {
      screen: AddDeviceScreen,
    },
    Configuration: {
      screen: ConfigurationScreen,
    },
    Device: {
      screen: DeviceScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Monitor: {
      screen: MonitorScreen,
    }
  }, {
    initialRouteName: 'Home',
  }
)

export default createDrawerNavigator(
  {
    Stack: Stack,
  }, {
    initialRouteName:'Stack',
    contentComponent: Drawer
  }
)