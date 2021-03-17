import React from "react";
import { withRouter } from "react-router";
import GoogleButton from "react-google-button";
import Fixing from "./img/fixing.png";
import dashLogo from "./img/dashLogo.png";
import Hands from "./img/handshake.svg";
import {faCog, faDoorClosed, faBorderAll } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';

import "./Navbar.css";

const Navbar = () => {
  return (
    <section className="navbar-contain">
      <div className='nav-content'>
        <img src={dashLogo} alt='dash-logo' />
      </div>
      <ul>
        <div className='list-icon first'>
          <div className='icon-item-holder'>
          <FontAwesomeIcon className='icon-item' icon={faBorderAll} />
        <li>Dashboard</li>
        </div>
        </div>
        <div className='list-icon'>
          <div className='icon-item-holder'>
        <FontAwesomeIcon className='icon-item' icon={faCog} />
        <li>Settings</li>
        </div>
        </div>
        <div className='list-icon'>
          <div className='icon-item-holder'>
        <FontAwesomeIcon className='icon-item' icon={faDoorClosed} />

        <li>Logout</li>
        </div>
        </div>

      </ul>
    </section>
  );
};

export default Navbar;
