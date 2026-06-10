import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator();

export default function StackProfile() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Profile"
                component={Profile}
            />

            <Stack.Screen
                name="Comments"
                component={Comments}
                options={{ headerShown: true, title: 'Comentarios' }}
            />
        </Stack.Navigator>
    )
}