import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined; 
  ManageExpense: { expenseId: number };
  Statistics: undefined;
  Auth: undefined
};

export type ManageExpenseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ManageExpense'>;

export interface ManageExpenseScreenProps {
  route: RouteProp<RootStackParamList, 'ManageExpense'>;
  navigation: ManageExpenseScreenNavigationProp;
}
