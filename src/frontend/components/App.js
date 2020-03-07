import React  from 'react';
import { BudgetContext, BudgetData } from '../contexts/BudgetContext'
import { Route, HashRouter } from 'react-router-dom';
import BudgetQuery from './BudgetQuery';
import Worksheet from './Worksheet';


function App() {

  return (
    <BudgetContext.Provider value={BudgetData}>
      <HashRouter>
        <Route path="/worksheet" component={Worksheet} />
        <Route path="/budget" component={BudgetQuery} />
      </HashRouter>
    </BudgetContext.Provider>
  );

}

export default App;
