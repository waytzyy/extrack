import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import HomeScreen from '../screen/HomeScreen';
import StatisticsScreen from '../screen/StatisticsScreen';
import ManageExpenseScreen from '../screen/ManageExpenseScreen';
import { AuthContext } from '../contexts/AuthContext';
import { RootStackParamList } from '../type';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {authContext?.user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
          <Stack.Screen name="ManageExpense" component={ManageExpenseScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
