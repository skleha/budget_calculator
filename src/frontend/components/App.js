import React  from 'react';
import { Route, HashRouter } from 'react-router-dom';
import BudgetQuery from './BudgetQuery';
import Worksheet from './Worksheet';


const BudgetContext = React.createContext();


function App() {
  const budget = { budget: 69 };
  
  return (
    <BudgetContext.Provider value={budget}>
      <HashRouter>
        <Route path="/worksheet" component={Worksheet} />
        <Route path="/budget" component={BudgetQuery} />
      </HashRouter>
    </BudgetContext.Provider>
  );

}

export default App;
