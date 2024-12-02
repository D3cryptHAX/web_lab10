import React from 'react';
import './ExpenseDate.css';

const ExpenseDate = ({ date }) => {
  const expenseDate = new Date(date);

  const month = expenseDate.toLocaleString('en-US', { month: 'long' });
  const year = expenseDate.getFullYear();
  const day = expenseDate.getDate();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ExpenseDate;
