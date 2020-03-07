import React  from 'react';
import { Route, HashRouter } from 'react-router-dom';
import BudgetQuery from './BudgetQuery';
import Worksheet from './Worksheet';


function App() {

  return (
    <HashRouter>
      <Route path="/worksheet" component={Worksheet} />
      <Route path="/budget" component={BudgetQuery} />
    </HashRouter>
  );

}

export default App;
