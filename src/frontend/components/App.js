import React, { useState }  from 'react';
import BudgetContext from '../contexts/BudgetContext';
import { Route, HashRouter } from 'react-router-dom';
import BudgetQuery from './BudgetQuery';
import Worksheet from './Worksheet';


function App() {

  const budgetHook = useState(0);

  return (
    <BudgetContext.Provider value={budgetHook}>
      <HashRouter>
        <Route path="/worksheet" component={Worksheet} />
        <Route path="/budget" component={BudgetQuery} />
      </HashRouter>
    </BudgetContext.Provider>
  );

}

export default App;
