import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/navigation/MyTabs';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
    return (
        <SafeAreaProvider>
            <ApolloProvider client={apolloClient}>
                <AuthStorageContext.Provider value={authStorage}>
                    <NavigationContainer>
                        <MyTabs />
                    </NavigationContainer>
                </AuthStorageContext.Provider>
            </ApolloProvider>
        </SafeAreaProvider>
    );
}
