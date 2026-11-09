/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './components/pages/DashboardPage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { IncomePage } from './components/pages/IncomePage';
import { ExpensesPage } from './components/pages/ExpensesPage';
import { BudgetsPage } from './components/pages/BudgetsPage';
import { AccountsPage } from './components/pages/AccountsPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { TransactionModal } from './components/modals/TransactionModal';
import { AccountModal } from './components/modals/AccountModal';
import { BudgetModal } from './components/modals/BudgetModal';
import { DeleteConfirmModal } from './components/modals/DeleteConfirmModal';
import { Transaction, Account, Budget } from './types/finance';

function FinanceAppContent() {
  const { activePage, deleteTransaction, deleteAccount, deleteBudget } = useFinance();

  // Modal states
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [txToEdit, setTxToEdit] = useState<Transaction | null>(null);

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);

  // Delete Confirm State
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Handlers
  const handleOpenAddTx = () => {
    setTxToEdit(null);
    setIsTxModalOpen(true);
  };

  const handleOpenEditTx = (tx: Transaction) => {
    setTxToEdit(tx);
    setIsTxModalOpen(true);
  };

  const handleOpenDeleteTx = (tx: Transaction) => {
    setDeleteModalState({
      isOpen: true,
      title: 'Delete Transaction',
      message: `Are you sure you want to delete "${tx.title}"? Your account balance will be automatically adjusted.`,
      onConfirm: () => deleteTransaction(tx.id),
    });
  };

  const handleOpenAddAccount = () => {
    setAccountToEdit(null);
    setIsAccountModalOpen(true);
  };

  const handleOpenEditAccount = (acc: Account) => {
    setAccountToEdit(acc);
    setIsAccountModalOpen(true);
  };

  const handleOpenDeleteAccount = (acc: Account) => {
    setDeleteModalState({
      isOpen: true,
      title: 'Delete Account',
      message: `Are you sure you want to delete the "${acc.name}" account?`,
      onConfirm: () => deleteAccount(acc.id),
    });
  };

  const handleOpenAddBudget = () => {
    setBudgetToEdit(null);
    setIsBudgetModalOpen(true);
  };

  const handleOpenEditBudget = (b: Budget) => {
    setBudgetToEdit(b);
    setIsBudgetModalOpen(true);
  };

  const handleOpenDeleteBudget = (b: Budget) => {
    setDeleteModalState({
      isOpen: true,
      title: 'Delete Category Budget',
      message: `Are you sure you want to remove the budget cap for "${b.category}"?`,
      onConfirm: () => deleteBudget(b.id),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar onAddTransactionClick={handleOpenAddTx} />

      {/* Main Viewport Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <Header onAddTransactionClick={handleOpenAddTx} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              onAddTransactionClick={handleOpenAddTx}
              onEditTransaction={handleOpenEditTx}
              onAddAccountClick={handleOpenAddAccount}
            />
          )}

          {activePage === 'transactions' && (
            <TransactionsPage
              onAddTransactionClick={handleOpenAddTx}
              onEditTransaction={handleOpenEditTx}
              onDeleteTransaction={handleOpenDeleteTx}
            />
          )}

          {activePage === 'income' && (
            <IncomePage
              onAddIncomeClick={handleOpenAddTx}
              onEditTransaction={handleOpenEditTx}
              onDeleteTransaction={handleOpenDeleteTx}
            />
          )}

          {activePage === 'expenses' && (
            <ExpensesPage
              onAddExpenseClick={handleOpenAddTx}
              onEditTransaction={handleOpenEditTx}
              onDeleteTransaction={handleOpenDeleteTx}
            />
          )}

          {activePage === 'budgets' && (
            <BudgetsPage
              onAddBudgetClick={handleOpenAddBudget}
              onEditBudget={handleOpenEditBudget}
              onDeleteBudget={handleOpenDeleteBudget}
            />
          )}

          {activePage === 'accounts' && (
            <AccountsPage
              onAddAccountClick={handleOpenAddAccount}
              onEditAccount={handleOpenEditAccount}
              onDeleteAccount={handleOpenDeleteAccount}
              onEditTransaction={handleOpenEditTx}
            />
          )}

          {activePage === 'reports' && <ReportsPage />}

          {activePage === 'settings' && <SettingsPage />}

          {activePage === 'profile' && <ProfilePage />}
        </main>
      </div>

      {/* Global Modals */}
      <TransactionModal
        isOpen={isTxModalOpen}
        onClose={() => {
          setIsTxModalOpen(false);
          setTxToEdit(null);
        }}
        transactionToEdit={txToEdit}
      />

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => {
          setIsAccountModalOpen(false);
          setAccountToEdit(null);
        }}
        accountToEdit={accountToEdit}
      />

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => {
          setIsBudgetModalOpen(false);
          setBudgetToEdit(null);
        }}
        budgetToEdit={budgetToEdit}
      />

      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={deleteModalState.onConfirm}
        title={deleteModalState.title}
        message={deleteModalState.message}
      />
    </div>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <FinanceAppContent />
    </FinanceProvider>
  );
}
