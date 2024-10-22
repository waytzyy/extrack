
import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { ManageExpenseScreenProps } from '../type';
import { getExpenseById, updateExpense } from '../services/dbService';
import { tailwind } from '../tailwind';
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
const ManageExpenseScreen: React.FC<ManageExpenseScreenProps> = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const loadExpense = useCallback(async () => {
        try {
          const fetchedExpense = await getExpenseById(expenseId) as Expense;
          if (fetchedExpense) {
            setDescription(fetchedExpense.description);
            setAmount(fetchedExpense.amount.toString());
            setCategory(fetchedExpense.category);
          }
        } catch (error) {
          console.error('Error loading expense:', error);
          Alert.alert('Error', 'Failed to load expense details');
        }
      }, [expenseId]);
      useEffect(() => {
        loadExpense();
      }, [loadExpense]);

  const handleUpdate = async () => {
    if (!description || !amount || !category) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const updatedExpense = {
      id: expenseId,
      description,
      amount: parseFloat(amount),
      category,
    };

    await updateExpense(updatedExpense);
    Alert.alert('Success', 'Expense updated successfully!');
    navigation.goBack(); // Navigate back after update
  };

  return (
    <View style={tailwind('flex-1 p-4')}>
      <TextInput
        style={tailwind('border p-2 mb-4')}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={tailwind('border p-2 mb-4')}
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <TextInput
        style={tailwind('border p-2 mb-4')}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Update Expense" onPress={handleUpdate} />
    </View>
  );
};

export default ManageExpenseScreen;
