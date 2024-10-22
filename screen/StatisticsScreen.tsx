import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getExpenses } from '../services/dbService';
import { tailwind } from '../tailwind'; 
interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
  }
const StatisticsScreen = () => {
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await getExpenses(null);
        calculateStatistics(data as Expense[]);
      } catch (error) {
        console.error('Failed to load expenses:', error);
      }
    };

    loadExpenses();
  }, []);



  const calculateStatistics = (data: Expense[]) => {
    let total = 0;
    const categoryTotals: { [key: string]: number } = {};

    data.forEach((expense) => {
      total += expense.amount;
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    setTotalSpending(total);
    setCategoryBreakdown(categoryTotals);
  };

  return (
    <View style={tailwind('flex-1 p-4')}>
      <Text style={tailwind('text-xl font-bold mb-4')}>Statistics</Text>
      <Text>Total Spending: ${totalSpending}</Text>
      <Text>Category Breakdown:</Text>
      <FlatList
        data={Object.keys(categoryBreakdown)}
        renderItem={({ item }) => (
          <Text>
            {item}: ${categoryBreakdown[item]}
          </Text>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default StatisticsScreen;
