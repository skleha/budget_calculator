import React, { useState } from 'react';



function BudgetQuery() {

  const [budget, setBudget] = useState(0);

  const handleProceedClick = e => {
    
    
  }

  return (
    <div className="budget-query">
      <div className="budget-title">
        Part 1: What were you thinking of spending?
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
