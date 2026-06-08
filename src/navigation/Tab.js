import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet } from 'react-native';

import Profile from '../screens/Profile';
import Home from '../screens/Home'
import CreatePost from '../screens/CreatePost'


export default function Stack(props) {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false}} >

            <Tab.Screen 
                name="StackHome"
                component={Home}
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
