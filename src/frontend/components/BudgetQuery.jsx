import React, { useState, useContext } from 'react';
import BudgetContext from '../contexts/BudgetContext';
import { validNumber } from '../helpers/helpers';



function BudgetQuery(props) {

  const [queryBudget, setQueryBudget] = useState(0);
  const [budget, setBudget] = useContext(BudgetContext);

  const handleProceedClick = e => {
    
    const commasRemoved = queryBudget.split(",").join("");
    
    if (validNumber(commasRemoved)) {
      setBudget(commasRemoved);
      props.history.push("/worksheet");
    } else {
      console.log("not valid input");
      // show error message
    }
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
