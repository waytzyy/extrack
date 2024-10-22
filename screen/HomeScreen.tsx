import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Button, Alert, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import { getExpenses, deleteExpense } from '../services/dbService';
import ExpenseItem from '../components/ExpenseItem';
import { tailwind } from '../tailwind';

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
};

type RootStackParamList = {
  Home: undefined;
  ManageExpense: { expenseId: number };
  Statistics: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext is undefined. Make sure the provider is wrapped around the component.');
      }
  const { user, logout } = authContext
  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    if (user) {
      loadExpenses(user.role === 'Admin' ? null : user.id);
    }
  }, [user]);

  const loadExpenses = async (userId: number | null) => {
    try {
      const data = await getExpenses(userId);
      setExpenses(data as Expense[]);
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const handleDelete = (id: number) => {
    if (user?.role === 'Admin') {
      Alert.alert('Confirm Delete', 'Are you sure you want to delete this expense?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteExpense(id);
              loadExpenses(user?.role === 'Admin' ? null : user.id);
            } catch (error) {
              console.error('Error deleting expense:', error);
            }
          },
        },
      ]);
    }
  };

  const handleEdit = (id: number) => {
    if (user?.role === 'Admin') {
      navigation.navigate('ManageExpense', { expenseId: id });
    }
  };

  const goToStatistics = () => {
    navigation.navigate('Statistics');
  };

  return (
    <View style={tailwind('flex-1 p-4')}>
      <Text style={tailwind('text-xl font-bold mb-4')}>
        {user?.role === 'Admin' ? 'All Expenses (Admin)' : 'Your Expenses'}
      </Text>

      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseItem
            {...item}
            onDelete={user?.role === 'Admin' ? handleDelete : undefined}
            onEdit={user?.role === 'Admin' ? handleEdit : undefined}
            isAdmin={user?.role === 'Admin'}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Button title="View Statistics" onPress={goToStatistics} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
