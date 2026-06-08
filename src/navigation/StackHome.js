import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register';
import Login from '../screens/Login';
import HomeMenu from '../components/HomeMenu';

const Stack = createNativeStackNavigator();

export default function StackHome() {
  return (


      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="Home"
          component={Login}
        />

        <Stack.Screen
          name="Comentarios"
          component={Register}
        />

      </Stack.Navigator>


  );
}