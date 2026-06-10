import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet } from 'react-native';

import StackProfile from './StackProfile';
import Home from '../screens/Home'
import CreatePost from '../screens/CreatePost'
import StackHome from './StackHome'

export default function Stack(props) {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }} >

            <Tab.Screen
                name="StackHome"
                component={StackHome}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" size={29} color="black" />
                    ),
                }}
            />

            <Tab.Screen
                name="CreatePost"
                component={CreatePost}
                options={{
                    tabBarIcon: () => (
                        <Entypo name="circle-with-plus" size={33} color="black" />
                    ),
                }}
            />

            <Tab.Screen
                name="StackProfile"
                component={StackProfile}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="person" size={24} color="black" />
                    ),
                }}
            />
    
        </Tab.Navigator>


    )
}
