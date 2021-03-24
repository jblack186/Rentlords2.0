import React, { useState, useEffect } from "react";
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
import { Modal, Button } from "react-bootstrap";
import BootStrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {
  faUser,
  faClipboard,
  faChevronDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "./img/profile-user.svg";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-identicon-sprites";
import axios from "axios";

const LDashboard = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [issues, setIssues] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [down, setDown] = useState("down")
   const [modalInfo, setModalInfo] = useState([]);
   const [showModal, setShowMoadal] = useState(false);

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const rowEvents = {
       onClick: (e, row) => {
         setModalInfo(row)
         toggleTrueFalse()
       }
   }

   const toggleTrueFalse = () => {
     setShowMoadal(handleShow)
   }

   const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: issues.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };
  
   const ModalContent = () => {
     return (<div className='mod-container'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
   <Modal.Title>Tenant name: {modalInfo.name}</Modal.Title>
        </Modal.Header>
                <Modal.Body><p>Work to be done- {modalInfo.body}</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

     </div>)
   }

  const dropdown = (e) => {
    e.target.classList.remove("drop");
    console.log(e.target.classList);
  };


  const columns = [
    {dataField: "name", text: "Tenant Name"},
    {dataField: "address", text: "Address"},
    {dataField: "date", text: "Date"},
    {dataField: "status", text: "Status"},
    {dataField: "category", text: "category"},

  ]


              {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

     */}
            
  const getIssues = async () => {
    try {
      const data = await axios.get("/api/tenants-issues");
      setIssues(data.data);
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getIssues();
  }, []);

  console.log("E", issues);

  let avatars = new Avatars(sprites, options);
  let svg = avatars.create("custom-seed");

  console.log("issues", issues);

  return (
    <section className="ldashboard-contain">
      <nav className="nav-dash">
        <Navbar />
      </nav>
      <div className="mobile">
        <FontAwesomeIcon className="navBar" icon={faBars} />
      </div>
      <section className="dashboard-content">
        <div className="top-dash">
          <div className="issues-header">
            <h3>Issues</h3>
            <p>{issues.length} orders found</p>
          </div>
          <div className="welcome">
            <p>Welcome back, {props.landlord.username}</p>
            <img src={Pic} alt="avatar" />
          </div>
        </div>
        <div className="order-date">
          <ul>
            <li>All issues</li>
            <li>Recieved</li>
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
        <div className="mid-dash">
          <BootStrapTable
            keyField="_id"
            data={issues}
            columns={columns}
            pagination={paginationFactory(options)}
            rowEvents={rowEvents}
           
          />
          {show ? <ModalContent /> : null}
        </div>
      </section>
    </section>
  );
};

export default LDashboard;
