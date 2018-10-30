import { createStackNavigator } from 'react-navigation';
import {
  LogInScreen,
  SignUpScreen
} from '../../screens';
import colors from '../../contants/colors';

export default createStackNavigator(
  {
    LogIn: {
      screen: LogInScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Log In'
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Sign Up'
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