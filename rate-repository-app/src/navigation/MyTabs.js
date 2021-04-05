import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RepositoryList from '../components/RepositoryList';
import SingleRepo from '../components/SingleRepo';
import SignIn from '../components/SignIn';
import { createStackNavigator } from '@react-navigation/stack';

const myheaderOptions = {
    headerTitleStyle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    headerTitleAlign: 'left'
};

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name='Repositories'
                component={RepositoryList}
                options={myheaderOptions}
            />
            <HomeStack.Screen name='Details' component={SingleRepo} />
        </HomeStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name='Profile' component={SignIn} />
        </ProfileStack.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: { borderTopColor: 'grey' }
            }}
        >
            <Tab.Screen name='Home' component={HomeStackScreen} />
            <Tab.Screen name='Profile' component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}

export default MyTabs;
