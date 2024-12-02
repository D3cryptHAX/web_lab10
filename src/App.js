import React, { useState, useEffect} from "react";
import Expenses from "./Expenses";
import NewExpense from "./NewExpense";
import { loadExpenses, createExpense, deleteExpense, updateExpense} from "./firebaseService";
import Loader from "./Loader";
import './App.css'

const DUMMY_EXPENSES = [
  { id: "e1", title: "Toilet Paper", amount: 94.12, date: new Date(2020, 7, 14) },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  { id: "e3", title: "Car Insurance", amount: 294.67, date: new Date(2021, 2, 28) },
  { id: "e4", title: "New Desk (Wooden)", amount: 450, date: new Date(2021, 5, 12) },
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        setLoading(true);
        const firebaseExpenses = await loadExpenses();
        setExpenses((prevExpenses) => {
          const newExpenses = firebaseExpenses.filter(
            (firebaseExpense) =>
              !prevExpenses.some((localExpense) => localExpense.id === firebaseExpense.id)
          );
          return [...prevExpenses, ...newExpenses];
        });
      } catch (error) {
        console.error("Error loading expenses: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, []);

  const addExpenseHandler = async (expense) => {
    setLoading(true);
    try {
      const newExpense = await createExpense(expense);
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]); 
    } catch (error) {
      console.error("Error adding expense: ", error);
    } finally {
      setLoading(false);
    }
  };

  const editExpenseHandler = async (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (!expenseToEdit) return;

    const updatedData = prompt(
      "Введите новые данные в формате: title,amount,date (например, Pen,5,2023-12-02)",
      `${expenseToEdit.title},${expenseToEdit.amount},${expenseToEdit.date.toISOString().split('T')[0]}`
    );

    if (updatedData) {
      const [title, amount, date] = updatedData.split(",");
      const updatedExpense = {
        title, 
        amount: parseFloat(amount),
        date: new Date(date),
      };
  
      setLoading(true);
      try {
        await updateExpense(expenseToEdit.title, updatedExpense);
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          )
        );
      } catch (error) {
        console.error("Error updating expense: ", error);
      } finally {
        setLoading(false);
      }
    }
  };  

  const deleteExpenseHandler = async (title) => {
    try {
      await deleteExpense(title); 
      setExpenses((prevExpenses) => prevExpenses.filter(exp => exp.title !== title));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Expenses items={expenses} />
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} style={{ display: 'block', alignItems: 'center' }}>
              <span style={{ flex: 1 }}>{expense.title}</span> {/* Название трат слева */}
                <button onClick={() => editExpenseHandler(expense.id)}>Редактировать</button>
                <button onClick={() => deleteExpenseHandler(expense.title)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;