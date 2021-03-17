import React, { useState } from "react";
import { withRouter } from "react-router";
import GoogleButton from "react-google-button";
import Fixing from "./img/fixing.png";
import Logo from "./img/rentLogo.png";
import Hands from "./img/handshake.svg";
import Navbar from "./Navbar";
import "./LDashboard.css";
import Pic from "./img/profileHead.jpeg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faUser, faHammer,faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "./img/profile-user.svg";

const LDashboard = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <section className="ldashboard-contain">
      <nav className="nav-dash">
        <Navbar />
      </nav>
      <section className="dashboard-content">
        <div className="top-dash">
          <div className="issues-header">
            <h3>Issues</h3>
            <p>0 orders found</p>
          </div>
          <img src={Pic} alt="avatar" />
        </div>
        <div className="order-date">
          <ul>
            <li>All issues</li>
            <li>Dispatch</li>
            <li>Pending</li>
            <li>Completed</li>
          </ul>
          <div className="dates">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <p>to</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="bar-dash">
          <ul>
            <li className="name">Name</li>

            <li className="addr">Address</li>
            <li className="date">Date</li>
            <li className="status">Status</li>
            <li className="action">Action</li>
          </ul>
        </div>
        <div className="mid-dash">
          <div className="user-content">
            <div className="name-pic">
              <img className="user-pic" src={User} />
              <li className="user-name">Susan Johnson</li>
            </div>
            <li className="user-addr">32 Madison Terr</li>
            <li className="user-date">12 March 2020</li>
            <li className="user-status">Pending</li>
            <li className="user-action">
              
              <FontAwesomeIcon className="user-pic" icon={faHammer} />
              <FontAwesomeIcon className="user-pic" icon={faChevronDown} />

              
            </li>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LDashboard;
