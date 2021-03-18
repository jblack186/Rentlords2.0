import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from 'axios';
import GoogleButton from "react-google-button";
import Fixing from "./img/fixing.png";
import Logo from "./img/rentLogo.png";
import Hands from "./img/handshake.svg";
import Navbar from "./Navbar";
import "./LDashboard.css";
import Pic from "./img/profileHead.jpeg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  faPlus,
  faHammer,
  faChevronDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "./img/profile-user.svg";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-identicon-sprites";

const TDashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  
  const [landlord, setLandlord] = useState('');
  const [plumbing, setPlumbing] = useState('');
  const [electrical, setElectrical] = useState('');
  const [carpentry, setCarpentry] = useState('');
  const [complaints, setComplaints] = useState('');
  const [fromTenantmessage, setFromTenantMessage] = useState('');
  const [tenantMessage, setTenantMessage] = useState('');

  const [issues, setIssues] = useState('');
  const [tempPlumbing, setTempPlumbing] = useState('');
  const [tempElectrical, setTempElectrical] = useState('');
  const [tempCarpentry, setTempCarpentry] = useState('');
  const [tempComplaints, setTempComplaints] = useState('');
  const [tempCount, setTempCount] = useState(0);
  const [show, setShow] = useState(false);
  const [tempMessage, setTempMessage] = useState('');
  const [click, setClick] = useState(false);

  let options = {};
  let avatars = new Avatars(sprites, options);
  let svg = avatars.create("custom-seed");


  
  useEffect(() => {
      localStorage.setItem('Role', 'Tenant')
  }, [])


  const changePlumbing = (e) => {
      e.preventDefault();
      setPlumbing(e.target.value)

  }

  const changeElectrical = (e) => {
      e.preventDefault();
      setElectrical(e.target.value)

  }

  const changeCarpentry = (e) => {
      e.preventDefault();
      setCarpentry(e.target.value)

  }

  const changeComplaints = (e) => {
      e.preventDefault();
      setComplaints(e.target.value)

  }

  const changeMessage = (e) => {
      e.preventDefault();
      setFromTenantMessage(e.target.value)

  }



  useEffect(() => {
      axios.get('/api/landlord')
          .then(res => {
              setLandlord(res.data)
              
          })
          .catch(err => {
          })
      

      axios.get('/api/tenant-issues')
          .then(res => {
              setTenantMessage(res.data.messages)
              setIssues(res.data)
          })
          .catch((err) => {
          })
      
  }, [])

  
  

  const plumbingIssue = e => {
      e.preventDefault();
      if(plumbing.length > 0) {
      axios.put('/api/plumbing', { plumbing: plumbing})
      .then(response => {
          setTempPlumbing([...tempPlumbing, plumbing])
          setTempCount(tempCount + 1)
        })
      .catch(error => {
      })
      setPlumbing('')
  }
    
  }

  const electricalIssue = e => {
      e.preventDefault();
      if(electrical.length > 0) {
      axios.put('/api/electrical', { electrical: electrical})
      .then(response => {
          setTempElectrical([...tempElectrical, response.data])
          setTempCount(tempCount + 1)

        })
      .catch(error => {
      })
      setElectrical('')
  }
  }

  const carpentryIssue = e => {
      e.preventDefault();
      if(carpentry.length > 0) {
      axios.put('/api/carpentry', {carpentry:carpentry})
      .then(response => {
          setTempCarpentry([...tempCarpentry, response.data])
          setTempCount(tempCount + 1)

        })
      .catch(error => {
      })
      setCarpentry('')
  }
  }
  const complaintsIssue = e => {
      e.preventDefault();
      if(complaints.length > 0) {
      axios.put('/api/complaints', { complaints: complaints})
      .then(response => {
          setTempComplaints([...tempComplaints, response.data])
          setTempCount(tempCount + 1)

        })
      .catch(error => {
      })
      setComplaints('')
  }
  }

  const messaging = e => {
      e.preventDefault();
      if(fromTenantmessage.length > 0) {
      axios.put('/api/fromTenantmessage', { message: fromTenantmessage})
      .then(response => {
          setClick(!click)
          setTempMessage([...tempMessage, response.data])


        })
      .catch(error => {
      })
      setFromTenantMessage('')
  }
  }

  const showIssues = e => {
      e.preventDefault();
      setShow(!show);
  }

  useEffect(() => {
      if(issues.length > 0) {
          issues.replace('You', 'forshizzle')
      }
  }, [issues])

  const scrollDown = e => {
      e.preventDefault();
      window.scrollTo(0,document.body.scrollHeight);
  }


  return (
    <section className="tdashboard-contain">
      <nav className="nav-dash">
        <Navbar />
      </nav>
      <div className="mobile">
        <FontAwesomeIcon className="navBar" icon={faBars} />
      </div>

      <section className="tdashboard-content">
        <h2>
          Hi Jamison, <span>Welcome back</span>
        </h2>
        <div className="middle-content">
          <div className="issues electrical">
            <h3>Electrical Issues</h3>
            <form>
              <textarea></textarea>
              <button type="submit">Send</button>
            </form>
            <div className="plus-box">
              <p>Add Picture</p>
            </div>
          </div>
          <div className="issues plumbing">
            <h3>Plumbing Issues</h3>
            <form onSubmit={plumbingIssue}>
  <textarea onChange={changePlumbing} value={plumbing}></textarea>
              <button type="submit">Send</button>
            </form>
            <div className="plus-box">
              <p>Add Picture</p>
            </div>
          </div>

          <div className="issues carpentry">
            <h3>Carpentry Issues</h3>
            <form>
              <textarea></textarea>
              <button type="submit">Send</button>
            </form>
            <div className="plus-box">
              <p>Add Picture</p>
            </div>
          </div>
          <div className="issues complaints">
            <h3>Complaints</h3>
            <form>
              <textarea></textarea>
              <button type="submit">Send</button>
            </form>
            <div className="plus-box">
              <p>Add Picture</p>
            </div>
          </div>
        </div>
      </section>
      <section className="notifications">
        <div className="top-notifications">
          <img
            className="user-pic"
            src="https://avatars.dicebear.com/api/identicon/:seed.svg?colors=blue"
          />
          <p>Jamison Blackwell</p>
        </div>
        <div className='bottom-notifications'>
          <h4>Issues</h4>
          <div className='issue-content'>
            <ul>
                <li>Plumbing</li>
                <div className='issue-menu'>
  <p>{issues.plumbing ? issues.plumbing.length + tempPlumbing.length : 0}</p>
                <FontAwesomeIcon className="arrowDown" icon={faChevronDown} />

                </div>
            </ul>
          </div>
          <div className='issue-content'>
            <ul>
                <li>Electrical</li>
                <div className='issue-menu'>
                  <p>0</p>
                <FontAwesomeIcon className="arrowDown" icon={faChevronDown} />

                </div>
            </ul>
          </div>
          <div className='issue-content'>
            <ul>
                <li>Carpentry</li>
                <div className='issue-menu'>
                  <p>0</p>
                <FontAwesomeIcon className="arrowDown" icon={faChevronDown} />

                </div>
            </ul>
          </div>
          <div className='issue-content'>
            <ul>
                <li>Complaints</li>
                <div className='issue-menu'>
                  <p>0</p>
                <FontAwesomeIcon className="arrowDown" icon={faChevronDown} />

                </div>
            </ul>
          </div>

        </div>
      </section>
    </section>
  );
};

export default TDashboard;
