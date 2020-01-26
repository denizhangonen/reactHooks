import React from "react";

import "./SideDrawer.scss";

import Backdrop from "../Backdrop/Backdrop";

const sideDrawer = props => {
  let classes = ["sideDrawer", "close"];
  if (props.open) {
    classes = ["sideDrawer", "open"];
  }

  return (
    <div>
      <Backdrop show={props.open} closeSideDrawer={props.closeSideDrawer} />
      <div className={classes.join(" ")}>Side Drawer</div>
    </div>
  );
};

export default sideDrawer;
