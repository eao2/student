// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ClassDetailScreen from './screens/ClassDetailScreen';
import GradeScreen from './screens/GradeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#822321',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Нүүр хуудас' }}
        />
        <Stack.Screen 
          name="ClassDetail" 
          component={ClassDetailScreen}
          options={{ title: 'Хичээлийн дэлгэрэнгүй' }}
        />
        <Stack.Screen 
          name="Grade" 
          component={GradeScreen}
          options={{ title: 'Үнэлгээ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

