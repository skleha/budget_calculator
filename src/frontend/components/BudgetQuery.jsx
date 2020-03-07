import React, { useState, useContext } from 'react';
import BudgetContext from '../contexts/BudgetContext';



function BudgetQuery() {

  const [queryBudget, setQueryBudget] = useState(0);
  const [budget, setBudget] = useContext(BudgetContext);

  const handleProceedClick = e => {
    setBudget(queryBudget);
  }

  return (
    <div className="budget-query">
      <div className="budget-title">
        Part 1: What were you thinking of spending? {budget} {queryBudget}
      </div>
      <input
        className="budget-input"
        type="text"
        placeholder="enter a number"
        onChange={e => setQueryBudget(e.currentTarget.value)}
      />
      <button className="proceed-button" onClick={handleProceedClick}>
        Proceed to Checklist
      </button>
    </div>
  );


}

export default BudgetQuery;
