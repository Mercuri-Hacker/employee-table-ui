import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyContacts from './src/Screens/MyContacts';
import CreateContact from './src/Screens/CreateContact'
import Profile from './src/Screens/Profile'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MyContacts'>
        <Stack.Screen name='MyContacts' component={MyContacts} />
        <Stack.Screen name='CreateContact' component={CreateContact} />
        <Stack.Screen name='Profile' component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
