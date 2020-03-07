import React  from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Worksheet from './Worksheet';


function App() {

  return (
    <HashRouter>
      <Route path="/" component={Worksheet} />
    </HashRouter>
  );

}

export default App;
