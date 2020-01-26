import React from "react";

const backdrop = ({ show, closeSideDrawer }) => {
  return show ? (
    <div className="backdrop" onClick={closeSideDrawer}></div>
  ) : null;
};

export default backdrop;
