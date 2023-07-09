import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProviderList from "./components/ProviderList";
// import ProviderDetail from './components/ProviderDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Switch>
            <Route exact path="/" component={ProviderList} />
            {/* <Route exact path="/providers/:id" component={ProviderDetail} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
