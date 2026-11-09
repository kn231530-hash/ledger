export type TransactionType = 'income' | 'expense';

export type IncomeCategory =
  | 'Salary'
  | 'Freelance'
  | 'Investments'
  | 'Rental'
  | 'Bonus'
  | 'Other Income';

export type ExpenseCategory =
  | 'Housing & Rent'
  | 'Food & Dining'
  | 'Groceries'
  | 'Transportation'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Travel'
  | 'Personal'
  | 'Other Expense';

export type TransactionCategory = IncomeCategory | ExpenseCategory;

export type AccountType = 'checking' | 'savings' | 'credit' | 'cash' | 'investment';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  accountNumberLast4?: string;
  institution?: string;
  color?: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string; // ISO format: YYYY-MM-DD
  accountId: string;
  paymentMethod: string;
  notes?: string;
  status?: 'cleared' | 'pending';
}

export interface Budget {
  id: string;
  category: ExpenseCategory;
  monthlyLimit: number;
  color?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  currency: string; // e.g. '$'
  currencyCode: string; // e.g. 'USD'
  monthlySavingsGoal: number;
  avatarUrl?: string;
  dateFormat: string;
}

export type NavigationPage =
  | 'dashboard'
  | 'transactions'
  | 'income'
  | 'expenses'
  | 'budgets'
  | 'accounts'
  | 'reports'
  | 'settings'
  | 'profile';
