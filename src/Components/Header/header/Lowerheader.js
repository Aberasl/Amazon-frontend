// Lowerheader.js

import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import classes from "../Header.module.css";

function Lowerheader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <CiMenuBurger />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Services</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default Lowerheader;
