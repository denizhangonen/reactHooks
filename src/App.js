import React, { useContext } from "react";

import { Switch, BrowserRouter as Router, Link, Route } from "react-router-dom";

import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";
import Auth from "./components/Auth";

import Parent from "./components/Test/router/parent";
import ParentWHook from "./components/Test/router/parentWHook";
import Counter from "./components/Test/counter";

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;

  if (authContext.isAuth) {
    content = <Ingredients />;
  }

  // return content;
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/routerExample">Router Example</Link>
          </li>
          <li>
            <Link to="/routerExampleWHook">Router Example With Hook</Link>
          </li>
          <li>
            <Link to="/ingredients">Ingredients</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/routerExample" children={<Parent />} />
          <Route path="/routerExampleWHook" children={<ParentWHook />} />
          <Route path="/ingredients" children={<Ingredients />} />
          <Route path="/counter" children={<Counter />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
