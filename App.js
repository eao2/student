// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// App.js
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ClassScreen from './screens/ClassScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import GradeScreen from './screens/GradeScreen';

const Stack = createStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#a44a53',
    background: '#ffffff',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#a44a53' } }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Нэвтрэх' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Нүүр хуудас' }} />
        <Stack.Screen name="Class" component={ClassScreen} options={{ title: 'Анги мэдээлэл' }} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} options={{ title: 'Ирц' }} />
        <Stack.Screen name="Grade" component={GradeScreen} options={{ title: 'Үнэлгээ' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
