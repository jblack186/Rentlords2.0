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
import ReactPaginate from "react-paginate";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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

   const rowEvents = (e) =>{
       console.log('yfa',e.target.value)
      setModalInfo()
   }

   const toggleTrueFalse = () => {
     setShowMoadal(handleShow)
   }

   const ModalCOntent = () => {
     return (<div></div>)
   }

  const dropdown = (e) => {
    e.target.classList.remove("drop");
    console.log(e.target.classList);
  };

  // const closeDropDown = (e) => {
  //   let yea = document.getElementsByClassName("user-action")
  //   console.log('yea', yea)

  //   yea.map(item => {
  //     item.classList.remove("drop")
  //   })
    
  // };

  const issuesPerPage = 5;
  const pagesVisited = pageNumber * issuesPerPage;
  const pageCount = Math.ceil(props.issues.length / issuesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const columns = [
    {dataField: "name", text: "Tenant Name"},
    {dataField: "address", text: "Address"},
    {dataField: "date", text: "Date"},
    {dataField: "status", text: "Status"},
    {dataField: "issue", text: "Issue"},

  ]

  const displayIssues = props.issues
    ? props.issues
        .slice(pagesVisited, pagesVisited + issuesPerPage)
        .map((issue) => {
          return (
            <div className="user-content">
              <div className="name-pic">
                <img
                  className="user-pic"
                  src="https://avatars.dicebear.com/api/identicon/:seed.svg?colors=blue"
                />
                <li onClick={rowEvents} value={[issue.body, issue.name]} className="user-name">{issue.name}</li>
              </div>
              <li className="user-addr">32 Madison Terr</li>
              <li className="user-date">{issue.date}</li>
              <li className="user-status">
                {issue.pending === true ? (
                  <p className="pending">Pending</p>
                ) : issue.recieved === true ? (
                  <p>Recieved</p>
                ) : issue.completed === true ? (
                  <p>Completed</p>
                ) : null}
              </li>
              {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
                <Modal.Body>{issue.body}<p>{issue.name}</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
            </div>
          );
        })
    : null;

  let arr = [];
  console.log("boom", arr);
  useEffect(() => {
    if (props.issues.length > 0) {
      props.issues.map((item) => {
        console.log("items", item);
      });
      setCount(
        props.issues[0].length +
          props.issues[1].length +
          props.issues[2].length +
          props.issues[3].length
      );
    }
  }, [props.issues]);

  console.log("E", count);

  let options = {};
  let avatars = new Avatars(sprites, options);
  let svg = avatars.create("custom-seed");

  console.log("props", props.issues);
  console.log("props2", props.issues[1]);

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
            <p>0 orders found</p>
          </div>
          <div className="welcome">
            <p>Welcome back, {props.landlord.username}</p>
            <img src={Pic} alt="avatar" />
          </div>
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
            <li className="action">Issue</li>
          </ul>
        </div>
        <div className="mid-dash">
          {displayIssues ? displayIssues : null}
          {props.issues.length <= 0 ? null : (
            <div>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="paginate"
                previousLinkClassName={"prevButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default LDashboard;
