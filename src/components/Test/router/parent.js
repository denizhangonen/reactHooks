import React from "react";
import { Switch, Link, BrowserRouter, Route } from "react-router-dom";

import Red from "./red";
import Yellow from "./yellow";

const parent = () => {
  return (
    <BrowserRouter>
      <div>
        It's parent damn it!
        <ul>
          <li>
            <Link to="/routerExample/red">Red</Link>
          </li>
          <li>
            <Link to="/routerExample/yellow">Yellow</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/routerExample/red" children={<Red />} />
          <Route path="/routerExample/yellow" children={<Yellow />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default parent;
