import React, { useContext } from "react";

import { Switch, Route, withRouter } from "react-router-dom";

import Ingredients from "./components/Ingredients/Ingredients";
import { AuthContext } from "./context/auth-context";
import Auth from "./components/Auth";

import Parent from "./components/Test/router/parent";
import ParentWHook from "./components/Test/router/parentWHook";
import Counter from "./components/Test/counter";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Layout from "./hoc/Layout/Layout";

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;

  if (authContext.isAuth) {
    content = <Ingredients />;
  }

  let layoutContent = (
    <Switch>
      <Route path="/routerExample" children={<Parent />} />
      <Route path="/routerExampleWHook" children={<ParentWHook />} />
      <Route path="/ingredients" children={<Ingredients />} />
      <Route path="/counter" children={<Counter />} />
    </Switch>
  );

  // return content;

  return (
    <div>
      <Layout>{layoutContent}</Layout>
    </div>
  );
  // return (
  //   <Router>
  //     <div>
  //       <Toolbar />
  //       <Switch>
  //         <Route path="/routerExample" children={<Parent />} />
  //         <Route path="/routerExampleWHook" children={<ParentWHook />} />
  //         <Route path="/ingredients" children={<Ingredients />} />
  //         <Route path="/counter" children={<Counter />} />
  //       </Switch>
  //     </div>
  //   </Router>
  // );
};

export default withRouter(App);
