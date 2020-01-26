import React from "react";

import { Link } from "react-router-dom";

import "./Toolbar.scss";

const toolbar = props => {
  return (
    <header className="toolbar">
      <div className="drawer-toggle" onClick={props.showSideDrawer}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className="desktopOnly">
        <ul className="navigationItems">
          <li className="navigationItem">
            <Link to="/routerExample">Router</Link>
          </li>
          <li className="navigationItem">
            <Link to="/routerExampleWHook">Router/Hook</Link>
          </li>
          <li className="navigationItem">
            <Link to="/ingredients">Ings</Link>
          </li>
          <li className="navigationItem">
            <Link to="/counter">Counter</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default toolbar;
