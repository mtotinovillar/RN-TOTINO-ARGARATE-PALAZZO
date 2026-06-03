import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Profile from '../screens/Profile';
import Home from '../screens/Home'


export default function Stack(props) {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator screenOptions={{ headerShown: false }}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                       <MaterialCommunityIcons name="home" size={24} color="black" />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="person" size={24} color="black" />
                    ),
                }}
            />

        </Tab.Navigator>


    )
}