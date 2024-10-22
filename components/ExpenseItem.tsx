import React from 'react';
import { View, Text, Button } from 'react-native';
import { tailwind } from '../tailwind';

interface ExpenseItemProps {
  id: number;
  description: string;
  amount: number;
  category: string;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  isAdmin: boolean;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ id, description, amount, category, onDelete, onEdit, isAdmin }) => {
  return (
    <View style={tailwind('flex-row justify-between p-2 border-b')}>
      <Text>
        {description} - ${amount} ({category})
      </Text>
      {isAdmin && (
        <View style={tailwind('flex-row')}>
          <Button title="Edit" onPress={() => onEdit && onEdit(id)} />  {/* Edit button */}
          <Button title="Delete" onPress={() => onDelete && onDelete(id)} />
        </View>
      )}
    </View>
  );
};

export default ExpenseItem;
