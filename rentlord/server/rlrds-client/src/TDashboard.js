import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
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
  faPaperPlane,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "./img/profile-user.svg";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-identicon-sprites";
import { Link } from "react-router-dom";

const TDashboard = (props) => {
  console.log("props", props.tenant);
  const [startDate, setStartDate] = useState(new Date());

  const [landlord, setLandlord] = useState("");
  const [plumbing, setPlumbing] = useState("");
  const [electrical, setElectrical] = useState("");
  const [carpentry, setCarpentry] = useState("");
  const [complaints, setComplaints] = useState("");
  const [fromTenantmessage, setFromTenantMessage] = useState("");
  const [tenantMessage, setTenantMessage] = useState("");

  const [issues, setIssues] = useState("");
  const [tempPlumbing, setTempPlumbing] = useState("");
  const [tempElectrical, setTempElectrical] = useState("");
  const [tempCarpentry, setTempCarpentry] = useState("");
  const [tempComplaints, setTempComplaints] = useState("");
  const [tempCount, setTempCount] = useState(0);
  const [show, setShow] = useState(false);
  const [tempMessage, setTempMessage] = useState("");
  const [click, setClick] = useState(false);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(["", ""]);
  const [imageName, setImageName] = useState("");
  const [newPic, setNewPic] = useState(false);
  const [elPic, setElPic] = useState(false);
  const [plPic, setPlPic] = useState(false);
  const [caPic, setCaPic] = useState(false);
  const [coPic, setCoPic] = useState(false);
  const [elDown, setElDown] = useState(false);

  const openEl = () => {
    setElDown(!elDown);
  };

  let options = {};
  let avatars = new Avatars(sprites, options);
  let svg = avatars.create("custom-seed");
  console.log("image", image);
  //cloudinary upload
  const uploadImage = async (e) => {
    const files = e.target.files;
    console.log(files[0].size);
    if (files[0].size < 3000000000) {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "rentlords");
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drgfyozzd/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();

      setImage([file.secure_url, image[1]]);
      setImageName(`${file.public_id}.${file.format}`);
      setLoading(false);
    } else {
      alert("The file you have chosen is to big. Must be under __ ");
    }
  };

  const submitImage = (e) => {
    e.preventDefault();
    axios
      .put("/api/picture", { url: imageName })
      .then((res) => {
        if (res.status === 200) {
          setNewPic(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    localStorage.setItem("Role", "Tenant");
  }, []);

  const changePlumbing = (e) => {
    e.preventDefault();
    setPlumbing(e.target.value);
  };

  const changeElectrical = (e) => {
    e.preventDefault();
    setElectrical(e.target.value);
  };

  const changeCarpentry = (e) => {
    e.preventDefault();
    setCarpentry(e.target.value);
  };

  const changeComplaints = (e) => {
    e.preventDefault();
    setComplaints(e.target.value);
  };

  const changeMessage = (e) => {
    e.preventDefault();
    setFromTenantMessage(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/landlord")
      .then((res) => {
        setLandlord(res.data);
      })
      .catch((err) => {});

    axios
      .get("/api/tenant-issues")
      .then((res) => {
        setIssues(res.data);
        console.log(res);
      })
      .catch((err) => {});
  }, []);

  const plumbingIssue = (e) => {
    e.preventDefault();
    if (plumbing.length > 0) {
      axios
        .put("/api/plumbing", { plumbing: plumbing, image: image[0] })
        .then((response) => {
          setPlPic(false);
          setTempPlumbing([...tempPlumbing, plumbing]);
          setTempCount(tempCount + 1);
          setImage(["", ""]);
        })
        .catch((error) => {});
      setPlumbing("");
      setImage(["", ""]);
    }
  };

  const plPicture = () => {
    setPlPic(true);
    setElPic(false);
    setCaPic(false);
    setCoPic(false);

    setImage([image[0], "plumbing"]);
  };

  const elPicture = () => {
    setPlPic(false);
    setElPic(true);
    setCaPic(false);
    setCoPic(false);
    setImage([image[0], "electrical"]);
  };

  const caPicture = () => {
    setPlPic(false);
    setElPic(false);
    setCaPic(true);
    setCoPic(false);
    setImage([image[0], "carpentry"]);
  };
  const coPicture = () => {
    setPlPic(false);
    setElPic(false);
    setCaPic(false);
    setCoPic(true);
    setImage([image[0], "complaints"]);
  };

  const electricalIssue = (e) => {
    e.preventDefault();
    if (electrical.length > 0) {
      axios
        .put("/api/electrical", { electrical: electrical, image: image[0] })
        .then((response) => {
          setElPic(false);
          setTempElectrical([...tempElectrical, {body: electrical, date: Date.now(), status: 'Pending'}]);
          setTempCount(tempCount + 1);
          setImage(["", ""]);
        })
        .catch((error) => {});
      setElectrical("");
      setImage(["", ""]);
    }
  };

  const carpentryIssue = (e) => {
    e.preventDefault();
    if (carpentry.length > 0) {
      axios
        .put("/api/carpentry", { carpentry: carpentry, image: image[0] })
        .then((response) => {
          setCaPic(false);
          setTempCarpentry([...tempCarpentry, carpentry]);
          setTempCount(tempCount + 1);
          setImage(["", ""]);
        })
        .catch((error) => {});
      setCarpentry("");
      setImage(["", ""]);
    }
  };
  const complaintsIssue = (e) => {
    e.preventDefault();
    if (complaints.length > 0) {
      axios
        .put("/api/complaints", { complaints: complaints, image: image[0] })
        .then((response) => {
          setCoPic(false);
          setTempComplaints([...tempComplaints, complaints]);
          setTempCount(tempCount + 1);
          setImage(["", ""]);
        })
        .catch((error) => {});
      setComplaints("");
      setImage(["", ""]);
    }
  };

  const messaging = (e) => {
    e.preventDefault();
    if (fromTenantmessage.length > 0) {
      axios
        .put("/api/fromTenantmessage", { message: fromTenantmessage })
        .then((response) => {
          setClick(!click);
          setTempMessage([...tempMessage, response.data]);
        })
        .catch((error) => {});
      setFromTenantMessage("");
    }
  };

  const showIssues = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  useEffect(() => {
    if (issues.length > 0) {
      issues.replace("You", "forshizzle");
    }
  }, [issues]);

  const scrollDown = (e) => {
    e.preventDefault();
    window.scrollTo(0, document.body.scrollHeight);
  };
  console.log("yo", props.landlord);
  console.log("no", tempElectrical);

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
          Hi {props.tenant.username}, <span>Welcome back</span>
        </h2>
        <div className="middle-content">
          <div className="issues electrical">
            <h3>Electrical Issues</h3>
            <form onSubmit={electricalIssue}>
              <textarea
                onChange={changeElectrical}
                value={electrical}
              ></textarea>
              {electrical.length > 0 ? (
                <p className="anyPics">Any Pictures?</p>
              ) : null}

              <div className={!elPic ? "plus-box" : "plus-box-open"}>
                {image[0].length > 0 && image[1] === "electrical" ? (
                  <img className="box-pic" src={image[0]} alt="your-pic" />
                ) : null}
                {!elPic ? (
                  <p onClick={elPicture}>
                    {" "}
                    <FontAwesomeIcon className="camera" icon={faCamera} />
                  </p>
                ) : (
                  <input
                    name="file"
                    type="file"
                    onChange={uploadImage}
                    className="file"
                    placeholder="Upload an image"
                  />
                )}
              </div>

              <button type="submit">
                <FontAwesomeIcon className="plane" icon={faPaperPlane} />
              </button>
            </form>
          </div>
          <div className="issues plumbing">
            <h3>Plumbing Issues</h3>
            <form onSubmit={plumbingIssue}>
              <textarea onChange={changePlumbing} value={plumbing}></textarea>
              {plumbing.length > 0 ? (
                <p className="anyPics">Any Pictures?</p>
              ) : null}
              <div className={!plPic ? "plus-box" : "plus-box-open"}>
                {image[0].length > 0 && image[1] === "plumbing" ? (
                  <img className="box-pic" src={image[0]} alt="your-pic" />
                ) : null}
                {!plPic ? (
                  <p onClick={plPicture}>
                    {" "}
                    <FontAwesomeIcon className="camera" icon={faCamera} />
                  </p>
                ) : (
                  <input
                    name="file"
                    type="file"
                    onChange={uploadImage}
                    className="file"
                    placeholder="Upload an image"
                  />
                )}
              </div>
              <button type="submit">
                {" "}
                <FontAwesomeIcon className="plane" icon={faPaperPlane} />
              </button>
            </form>
          </div>

          <div className="issues carpentry">
            <h3>Carpentry Issues</h3>
            <form onSubmit={carpentryIssue}>
              <textarea onChange={changeCarpentry} value={carpentry}></textarea>
              {carpentry.length > 0 ? (
                <p className="anyPics">Any Pictures?</p>
              ) : null}
              <div className={!caPic ? "plus-box" : "plus-box-open"}>
                {image[0].length > 0 && image[1] === "carpentry" ? (
                  <img className="box-pic" src={image[0]} alt="your-pic" />
                ) : null}
                {!caPic ? (
                  <p onClick={caPicture}>
                    {" "}
                    <FontAwesomeIcon className="camera" icon={faCamera} />
                  </p>
                ) : (
                  <input
                    name="file"
                    type="file"
                    onChange={uploadImage}
                    className="file"
                    placeholder="Upload an image"
                  />
                )}
              </div>
              <button type="submit">
                <FontAwesomeIcon className="plane" icon={faPaperPlane} />
              </button>
            </form>
          </div>
          <div className="issues complaints">
            <h3>Complaints</h3>
            <form onSubmit={complaintsIssue}>
              <textarea
                onChange={changeComplaints}
                value={complaints}
              ></textarea>
              {complaints.length > 0 ? (
                <p className="anyPics">Any Pictures?</p>
              ) : null}
              <div className={!coPic ? "plus-box" : "plus-box-open"}>
                {image[0].length > 0 && image[1] === "complaints" ? (
                  <img className="box-pic" src={image[0]} alt="your-pic" />
                ) : null}
                {!coPic ? (
                  <p onClick={coPicture}>
                    {" "}
                    <FontAwesomeIcon className="camera" icon={faCamera} />
                  </p>
                ) : (
                  <input
                    name="file"
                    type="file"
                    onChange={uploadImage}
                    className="file"
                    placeholder="Upload an image"
                  />
                )}
              </div>
              <button type="submit">
                <FontAwesomeIcon className="plane" icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="notifications">
        <div className="top-notifications">
          <Link to="/settings">
            <div className="user-pic-holder">
              {props.tenant && props.tenant.picture.length > 0 ? (
                <img src={props.tenant.picture} alt="your-avatar" />
              ) : (
                <img
                  className="user-pic"
                  src="https://avatars.dicebear.com/api/identicon/:seed.svg?colors=blue"
                />
              )}
              <FontAwesomeIcon className="camera-pic" icon={faCamera} />
            </div>
          </Link>
          <p>{props.tenant.wholeName}</p>
        </div>
        <div className="bottom-notifications">
          {elDown === false ? <h4>Issues</h4> : null}
          <div className="issue-content">
            <ul>
              <li>Electrical</li>
              <div className="issue-menu">
                <p>
                  {issues.electrical
                    ? issues.electrical.length + tempElectrical.length
                    : 0}
                </p>
                <FontAwesomeIcon
                  onClick={openEl}
                  className="arrowDown"
                  icon={faChevronDown}
                />
              </div>
            </ul>

            { elDown ? 
              <div className="issue-item">
                            { tempElectrical ? 
              <div className='temp-items'>
                {issues
                  ? tempElectrical.map((item) => {
                      return (
                        <div>
                          <ul>
                            <li>
                              {item.status}
                            </li>
                            <li>{item.body}</li>
                            <li>{item.date}</li>
                          </ul>
                        </div>
                      );
                    })
                  : null}
                  
              </div>
           : null }
                {issues
                  ? issues.electrical.map((item) => {
                      return (
                        <div>
                          <ul>
                            <li>
                              {item.pending === true
                                ? "Pending"
                                : item.recieved === true
                                ? "Recieved"
                                : item.completed === true
                                ? "Completed"
                                : null}
                            </li>
                            <li>{item.body}</li>
                            <li>{item.date}</li>
                          </ul>
                        </div>
                      );
                    })
                  : null}
                  
              </div>
           : null }
          </div>
          <div className="issue-content">
            <ul>
              <li>Plumbing</li>
              <div className="issue-menu">
                <p>
                  {issues.plumbing
                    ? issues.plumbing.length + tempPlumbing.length
                    : 0}
                </p>
                <FontAwesomeIcon className="arrowDown" icon={faChevronDown} />
              </div>
            </ul>
          </div>

          <div className="issue-content">
            <ul>
              <li>Carpentry</li>
              <div className="issue-menu">
                <p>
                  {issues.carpentry
                    ? issues.carpentry.length + tempCarpentry.length
                    : 0}
                </p>

                <FontAwesomeIcon className="arrowDown" icon={faChevronDown} />
              </div>
            </ul>
          </div>
          <div className="issue-content">
            <ul>
              <li>Complaints</li>
              <div className="issue-menu">
                <p>
                  {issues.complaints
                    ? issues.complaints.length + tempComplaints.length
                    : 0}
                </p>

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
