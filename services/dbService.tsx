import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'ExpenseTracker.db' });

export const createTable = async () => {
  (await db).transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, amount REAL, category TEXT, userId INTEGER);'
    );
  });
};

export const getExpenses = async (userId: number | null = null): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    const query = userId ? 'SELECT * FROM expenses WHERE userId = ?;' : 'SELECT * FROM expenses;';

    (await db).transaction(tx => {
      tx.executeSql(
        query,
        userId ? [userId] : [],
        (_, results) => {
          const expenses: any[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            expenses.push(results.rows.item(i));
          }
          resolve(expenses);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getExpenseById = async (id: number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'SELECT * FROM expenses WHERE id = ?;',
        [id],
        (_, results) => {
          resolve(results.rows.item(0));
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const updateExpense = async (expense: { id: number; description: string; amount: number; category: string }): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'UPDATE expenses SET description = ?, amount = ?, category = ? WHERE id = ?;',
        [expense.description, expense.amount, expense.category, expense.id],
        (_, _result) => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteExpense = async (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'DELETE FROM expenses WHERE id = ?;',
        [id],
        (_, _result) => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
