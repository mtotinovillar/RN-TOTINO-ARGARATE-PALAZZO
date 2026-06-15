import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons, FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import StackProfile from './StackProfile';
import Home from '../screens/Home'
import CreatePost from '../screens/CreatePost'
import StackHome from './StackHome'


export default function Stack() {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }} >

            <Tab.Screen
                name="StackHome"
                component={StackHome}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="home" size={27} color="black" />
                    ),
                }}
            />

            <Tab.Screen
                name="CreatePost"
                component={CreatePost}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="add-circle" size={35} color="black" />
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
