import React, { useState, useEffect } from "react";

import Red from "./red";
import Yellow from "./yellow";

const ParentWHook = () => {
  const [userRoute, setUserRoute] = useState(null);

  useEffect(() => {
    document.title = "Selection: " + userRoute;
  }, [userRoute]);

  let content = (
    <div>
      <h3>Nothing selected yet!</h3>
    </div>
  );

  switch (userRoute) {
    case "red":
      content = <Red />;
      break;
    case "yellow":
      content = <Yellow />;
      break;
    default:
      break;
  }
  return (
    <div>
      <ul>
        <li>
          <button onClick={() => setUserRoute("red")}>Red</button>
        </li>
        <li>
          <button onClick={() => setUserRoute("yellow")}>Yellow</button>
        </li>
      </ul>
      {content}
    </div>
  );
};

export default ParentWHook;
