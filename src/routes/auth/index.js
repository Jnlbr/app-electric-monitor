import { createStackNavigator } from 'react-navigation';
import {
  LogInScreen,
  SignUpScreen,
  LicenseScreen
} from '../../screens';
import colors from '../../contants/colors';

export default createStackNavigator(
  {
    LogIn: {
      screen: LogInScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Iniciar sesion'
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Registrar'
      })
    },
    LicenseScreen: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'License register'
      })
    }
  }, {
    initialRouteName:'LogIn',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary.main,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    } 
  }
)