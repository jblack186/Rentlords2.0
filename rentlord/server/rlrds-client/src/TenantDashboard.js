import React, {useState, useEffect} from 'react';
import './Dashboard.css';
import { faComments, faPaperPlane, faToilet, faLightbulb, faHammer, faUserFriends, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SideBar from './SideBar';


const TenantDashboard = (props) => {
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
            setTempPlumbing([...tempPlumbing, response.data])
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
        <div className='ten-contain'>
            <SideBar />
        <div>
        <div className='tenant-dash-contain'>
            <div className='dash'>
                <div className='tenant-user-info-contain'>
                    <div className='user-info'>
                        <div className='notifications'>
                        <ul>
                                <div className='issues'>
                                <li className='issue-li'>
                                    Notifications
                                    <p className='issue-count'>You have {issues ? issues.plumbing.length + issues.carpentry.length + issues.electrical.length + issues.complaints.length + tempCount : 0} issues</p>
                                    <button className='issues-button' onClick={showIssues}>See issues</button>

                                </li>
                               </div>
                                <div className={show === false ? 'hide' : 'issues-list-contain'}>
                                <li>
                                <div className='amneties-contain'>
                                <h3 className={(issues && issues.plumbing.length > 0) || tempPlumbing.length > 0 ? 'issue-header' : 'hide'}>Your Plumbing Issues</h3>
                                {issues ? issues.plumbing.map(iss => {
                                return <div className={show === false ? '.hide-map-contain' : 'map-contain'}>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? 'hi' : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? 'hi' : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? 'hi' : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}
                                {tempPlumbing ? tempPlumbing.map(iss => {
                                return <div className='map-contain'>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? 'hi' : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? 'hi' : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? 'hi' : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}
                              
                                </div>
                                </li>
                                <li>
                                <div className='amneties-contain'>
                                <h3 className={(issues && issues.electrical.length) > 0 || tempElectrical.length > 0 ? 'issue-header' : 'hide'}>Your Electrical Issues</h3>
                                {issues ? issues.electrical.map((iss, index) => {
                                return <div key={index} className='map-contain'>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? null : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? null : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? null : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}
                                {tempElectrical ? tempElectrical.map(iss => {
                                return <div className='map-contain'>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? 'hi' : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? 'hi' : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? 'hi' : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}

                                </div>
                                </li>
                                <li>
                                <div className='amneties-contain'>
                                <h3 className={(issues && issues.carpentry.length > 0) || tempCarpentry.length > 0 ? 'issue-header' : 'hide'}>Your Carpentry Issues</h3>
                                {issues ? issues.carpentry.map(iss => {
                                return <div className='map-contain'>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? null : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? null : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? null : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}
                                {tempCarpentry ? tempCarpentry.map(iss => {
                                return <div className='map-contain'>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? 'hi' : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? 'hi' : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? 'hi' : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}

                                </div>
                                </li>

                                <li>
                                <div className='amneties-contain'>
                                <h3 className={(issues && issues.complaints.length > 0) || tempComplaints.length > 0 ? 'issue-header' : 'hide'}>Your Complaints Issues</h3>
                                {issues ? issues.complaints.map(iss => {
                                return <div className='map-contain'>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? null : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? null : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? null : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}
                                {tempComplaints ? tempComplaints.map(iss => {
                                return <div className='map-contain'>
                                        <p className='body'>{iss.body}</p>
                                        <div className='situation'>
                                            <p className={iss.pending === true ? 'hi' : 'bye'}>Pending</p>
                                            <p className={iss.recieved === true ? 'hi' : 'bye'}>Recieved</p>
                                            <p className={iss.completed === true ? 'hi' : 'bye'}>Completed</p>
                                        </div>
                                        </div>
                                })
                                : null}

                                </div>
                                </li>

                                </div>
                            </ul>
                        </div>
                        </div>
                        <div className='user'>
                            {props.tenant && props.tenant.picture.length > 0 ? <img className='profile-img' src={`https://res.cloudinary.com/drgfyozzd/image/upload/${props.tenant.picture}`} alt='looking great'  /> : <FontAwesomeIcon icon={faUser} style={{color: 'white', fontSize: '200px', marginTop: '250px', border: 'solid 1px', padding: '10px', borderRadius: '20px'}}/>}                               {!props.tenant || props.tenant.picture.length <= 0 ? <Link to='/settings'><p>Upload Picture</p></Link> : null}
                            <div className='profile-box'>
                                <p>{props.tenant ? props.tenant.wholeName : null}</p>
                                <address className='address'> 18 A st Derby, CT, 06418</address>
                            </div>
                        </div>
                        <p onMouseOver={scrollDown} className='tag'>Messages</p>
                    
                        <div className='amneties'>
                            <ul className='issues-list-container'>
                            
                               
                               <div className='card-container'>
                                    <li className='iss second'>
                                        <div className='plumbing'>
                                                <FontAwesomeIcon icon={faToilet} style={{color: 'white', fontSize: '40px'}}/>          
                                                Plumbing
                                        </div>
                                        <div className='card-back'>
                                            <p>What is the plumbing issue?</p>
                                            <form>
                                                <textarea onChange={changePlumbing} value={plumbing} className='textarea'/>
                                                <button type='reset' onClick={plumbingIssue} >Send</button>
                                            </form>
                                        </div>
                                    </li>
                                </div>
                            <div className='card-container'>
                                <li className='iss second'>
                                    <div className='plumbing'>
                                        <FontAwesomeIcon icon={faLightbulb} style={{color: 'white', fontSize: '40px'}}/>          
                                        Electrical
                                    </div>
                                    <div className='card-back'>
                                            <p>What is the electrical issue?</p>
                                            <form>
                                            <textarea onChange={changeElectrical} value={electrical} className='textarea'/>
                                                <button onClick={electricalIssue} type='submit'>Send</button>
                                            </form>
                                        </div>
                                </li>
                            </div>
                            <div className='card-container'>
                                    <li className='iss second'>
                                        <div className='plumbing'>
                                                <FontAwesomeIcon icon={faHammer} style={{color: 'white', fontSize: '40px'}}/>          
                                                Carpentry
                                        </div>
                                        <div className='card-back'>
                                            <p>What is the carpentry issue?</p>
                                            <form>
                                            <textarea onChange={changeCarpentry} value={carpentry} className='textarea'/>
                                                <button onClick={carpentryIssue} type='submit'>Send</button>
                                            </form>
                                        </div>
                                    </li>
                                </div>
                                <div className='card-container'>
                                    <li className='iss second'>
                                        <div className='plumbing'>
                                                <FontAwesomeIcon icon={faUserFriends} style={{color: 'white', fontSize: '40px'}}/>          
                                                Complaints
                                        </div>
                                        <div className='card-back'>
                                            <p>What are the complaintss?</p>
                                            <form>
                                            <textarea onChange={changeComplaints} value={complaints} className='textarea'/>
                                                <button onClick={complaintsIssue} type='submit'>Send</button>
                                            </form>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                </div>
            </div>
            </div>
            <div className='tenant-top-bar-container'>
            <div className='tenant-top-bar'>
                    <div className='message-logo'>
                        <FontAwesomeIcon icon={faComments} style={{color: 'darkGray', fontSize: '40px'}}/>          
                    </div>
                    <div className='message'>
                        <input onChange={changeMessage} value={fromTenantmessage} type='text' placeholder='Message landlord for any problems'/>
                        <div  className={click  ? 'paper-click' : 'paper' }>
                            <li><FontAwesomeIcon icon={faPaperPlane} onClick={messaging} style={{color: 'darkGray', fontSize: '40px'}}/></li>         
                        </div>
                    </div>
                    <div className='lanlord'>
                        <div className='landlord-info'>
                            <img className='landlord-img' src='' alt=''/>
                            <p>Your Lanlord, {landlord.username}</p>
                        </div>
                    </div>
                </div>
</div>
</div>
            <div>
                <div className={tenantMessage ? 'tenant-message-box' : null}>
                    <div className='tenant-messaging'>
                        {tenantMessage ? tenantMessage.map((item, index) => { 
                            return item.replace('Tenant', 'for') && <p key={index} style={item.includes('Tenant') ? {backgroundColor: 'blue', color: 'white', alignSelf: 'flex-end', width: '200px', marginTop: '10px'} : item.includes('You:') ? { backgroundColor: 'grey', width: '200px', marginTop: '10px'} : null}>{item.replace('You:', `${landlord.username}:`).replace('Tenant', 'You:')}</p>
                        }) : null} 
                        {tempMessage && props.tenant ? tempMessage.map(mess => {
                            return <div style={{alignSelf: 'flex-end'}}> <p style={{color: 'white', backgroundColor: 'blue', paddingBottom: '10px;', width: '200px' }}>You: {mess} </p></div>
                        }) : null}
                    </div>
                </div>
                </div>

        </div>
    )
}//els

export default TenantDashboard;