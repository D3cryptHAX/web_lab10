import { db } from './firebase';
import { collection, deleteDoc, setDoc, query, where, getDocs, doc} from 'firebase/firestore';

export async function createExpense(expense) {
  try {
    const expensesCollection = collection(db, "expenses");
    const expenseDoc = doc(expensesCollection, expense.title); 

    await setDoc(expenseDoc, {
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      date: expense.date instanceof Date ? expense.date : new Date(expense.date),
    });

    console.log(`Expense with title "${expense.title}" added or updated successfully.`);
    return { id: expense.title, ...expense }; 
  } catch (error) {
    console.error("Error adding expense: ", error);
    throw error;
  }
}
export async function loadExpenses() {
  const expensesCollection = collection(db, "expenses");
  const snapshot = await getDocs(expensesCollection);
  const expenses = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate(), 
  }));
  return expenses;
}

export async function updateExpense(title, updatedData) {
  try {
    const expensesCollection = collection(db, "expenses");
    const expenseDoc = doc(expensesCollection, title);

    await setDoc(expenseDoc, updatedData, { merge: true });
    console.log(`Expense with title "${title}" updated successfully.`);
  } catch (error) {
    console.error("Error updating expense: ", error);
    throw error;
  }
}

export const deleteExpense = async (title) => {
  try {
    const expensesCollection = collection(db, "expenses");

    const q = query(expensesCollection, where("title", "==", title));

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      snapshot.docs.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "expenses", docSnap.id));
        console.log(`Expense with title "${title}" deleted successfully.`);
      });
    } else {
      console.log(`No expense found with title "${title}".`);
    }
  } catch (error) {
    console.error("Error deleting expense from Firestore:", error);
    throw error;
  }
};
