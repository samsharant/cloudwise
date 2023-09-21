import React from "react";
import { Link } from "react-router-dom";
import vbLogo from "../../Assets/cw-logo.png";
import { tabTypes } from "../../constants";
import "./NavigationTab.css";

function NavigationTab({ activeTab }) {
  return (
    <div className="tabs-container">
      <div className="logo-placeholder">
        <Link to="/">
          <img className="vb-logo" src={vbLogo} alt="Valuebound Logo" />
        </Link>
      </div>
      <Link to="/dashboard">
        <div
          className={activeTab === tabTypes.DASHBOARD ? "active-tab" : "tab"}>
          DASHBOARD
        </div>
      </Link>
      <Link to="/inventory">
        <div
          className={activeTab === tabTypes.INVENTORY ? "active-tab" : "tab"}>
          INVENTORY
        </div>
      </Link>
    </div>
  );
}

export default NavigationTab;
