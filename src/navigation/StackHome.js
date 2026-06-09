import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ headerShown: true, title: 'Comentarios' }}
      />

    </Stack.Navigator>
  );
}