import React, { Component } from "react";

import Toolbar from "../../components/UI/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  showSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const { showSideDrawer } = this.state;
    return (
      <div>
        <Toolbar showSideDrawer={this.showSideDrawerHandler} />
        <SideDrawer
          open={showSideDrawer}
          closeSideDrawer={this.closeSideDrawerHandler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
