import React, { useState, useEffect } from "react";

import {
  Switch,
  Route,
  useParams,
  BrowserRouter as Router
} from "react-router-dom";

const Child = () => {
  const { id } = useParams();
  return (
    <div>
      <h3>id: {id}</h3>
    </div>
  );
};

const Counter = () => {
  console.log("Counter");
  const [userCounter, setUserCounter] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    document.title = `You have clicked ${userCounter} times`;
  });
  console.log("counter 2");
  return (
    <Router>
      <div>
        <p>You clicked {userCounter} times.</p>
        <button onClick={() => setUserCounter(userCounter + 1)}>
          Click Me!
        </button>
        <Switch>
          <Route path="/:id" children={<Child />} />
        </Switch>
      </div>
    </Router>
  );
};

export default Counter;
