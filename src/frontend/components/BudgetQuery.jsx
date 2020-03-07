import React, { useState, useContext } from 'react';
import { BudgetContext } from '../contexts/BudgetContext';



function BudgetQuery() {

  const [budget, setBudget] = useState(0);
  const BudgetData = useContext(BudgetContext);

  const handleProceedClick = e => {
    
  }

  return (
    <div className="budget-query">
      <div className="budget-title">
        Part 1: What were you thinking of spending? {BudgetData.amount}
      </div>
      <input
        className="budget-input"
        type="text"
        placeholder="enter a number"
        onChange={e => setBudget(e.currentTarget.value)}
      />
      <button className="proceed-button" onClick={handleProceedClick}>
        Proceed to Checklist
      </button>
    </div>
  );


}

export default BudgetQuery;
