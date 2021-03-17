import React, {useState, useEffect} from 'react';
import './Dashboard.css';
import { faComments, faPaperPlane, faExclamationTriangle, faUser, faDotCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import SideBar from './SideBar';

const LandlordDashboard = (props) => {
    const [message, setMessage] = useState('');
    const [dropPlumbing, setDropPlumbing] = useState(false)
    const [tenantName, setTenantName] = useState([]);
    const [fromTenantMessage, setFromTenantMessage] = useState('');
    const [tenId, setTenId] = useState('');
    const [tempMessage, setTempMessage] = useState('');
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    const changeMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value)

    }  

    useEffect(() => {
        localStorage.setItem('Role', 'Landlord')
    }, [])


    const dropdownPlumbing = e => {
        e.preventDefault();
        setDropPlumbing(!dropPlumbing);
        if(dropPlumbing === true) {
       e.target.innerHTML = 'Expand'
        } else {
            e.target.innerHTML = 'Hide'
        }
    }




 async function tenantMessage(e) {
     setOpen(true);
    const nameId = e.target.value.split(',')
    const messArr = [];
    setTenId(nameId[1])
    try {
        await setTenantName(nameId[0])
        for (var i = 0; i < nameId.length; i++) {
            if (i >= 2) {
               await messArr.push(nameId[i])
            }
        }
    
     } catch(error) {
     }
     await setFromTenantMessage(messArr)

}

const sendMessage = e => {
    e.preventDefault();
    if (message.length > 0) {
    axios.put('/api/toTenantMessage', {message: message, id: tenId})
        .then((response) => {
            setClick(!click)
            setTempMessage([...tempMessage, response.data])
        })
        .catch(err => {
        })
        setMessage('')
    }

}

const close = e => {
    e.preventDefault();
    setTenantName('');
    setFromTenantMessage('');
    setOpen(false);
}
console.log('props', props.issues)
    return (
        <div className='dashboard-contain'>
        <SideBar landlord={props.landlord.wholeName} pic={props.landlord.picture} />

            <div className='dash'>
            <div className='bar-message'>
                <div className='top-bar'>
                <h2>Messages</h2>
    {props.issues ? props.issues.map((item, index) => { return item.pics.length > 0 ? <div className={!open ? 'tenant-message-button' : 'none'}> <div className='message-overlay'></div> <div className='message-image-contain'><img src={`https://res.cloudinary.com/drgfyozzd/image/upload/${item.pics}` } /></div> <p>{item._userName}</p><button  onClick={tenantMessage} value={[item._userName, item._user, item.fromTenantMessage]}>See Messages</button>                <button onClick={close} style={fromTenantMessage ? {borderRadius: '5px', backgroundColor: 'blue', border: 'none', width:'20%', cursor: 'pointer', color: 'white'} : {display: 'none'}}>Close</button> 
    </div> : <div className={!open ? 'tenant-message-button' : 'none'}><FontAwesomeIcon icon={faUser} style={{ zIndex: '99', color: 'gray', width: '15%', height: '30%', borderRadius: '20px'}}/> <div className='message-overlay'></div> <p>{item._userName}</p><p>No Messages</p></div> }) : null
                    }
                    
            </div>
                    {/* <div className='message-logo'>
                        <FontAwesomeIcon icon={faComments} style={{color: 'darkGray', fontSize: '40px'}}/>          
                    </div>
                    
                    <div className='message'>
                        <input onChange={changeMessage} value={message} type='text' placeholder={tenantName.length > 0 ? `Message ${tenantName}` : 'Choose tenant to message'}/>
                        <div  className={click  ? 'paper-click' : 'paper' }>
                            <li><FontAwesomeIcon onClick={sendMessage} icon={faPaperPlane} style={{color: 'darkGray', fontSize: '40px'}}/></li>    
                        </div>  
                        </div>     */}
                       
                   
                
                {/* <div className='button-box'>
                <div>
                <DropdownButton className='tenant-button' id="dropdown-item-button" title={tenantName.length > 0 ? `Messaging ${tenantName}` : "Choose Tenant Here"}>
                    {props.issues ? props.issues.map((item, index) => { return <Dropdown.Item as="button" key={index} onClick={tenantMessage} value={[item._userName, item._user, item.fromTenantMessage]}>{item._userName}</Dropdown.Item>}) :  null}
                </DropdownButton>
                </div>
                </div> */}
                                <div className={fromTenantMessage ? 'message-box' : null}>
                    <div className='messaging'>
                        {fromTenantMessage ? fromTenantMessage.map((item, index )=> {
                            return <p key={index} style={item.includes('Tenant') ? {backgroundColor: 'lightgray'} : item.includes('You:') ? {color: 'white', backgroundColor: 'blue', alignSelf: 'flex-end'} : null}>{item.replace('Landlord:', 'You') && item.replace('Tenant', `${tenantName}:`)}</p>
                        }) : null} 
                        {tempMessage && tenantName ? tempMessage.map((mess, index) => {
                            return <div key={index} style={{alignSelf: 'flex-end'}}> <p style={{color: 'white', backgroundColor: 'blue', paddingBottom: '0px;' }}>You: {mess} </p></div>
                        }) : null}
                    </div>
                </div>
                <button className={!open ? 'none' : 'close-button'} onClick={close}>Pick another tenant to message</button>

                </div>
                <div className='user-info-contain'>
                    <div className='issues-profile'>
                        <div className='landlord-notifications'>
                               { props.issues ? props.issues.map((iss, index) => { return <div key={index} className={iss.plumbing.length > 0 || iss.electrical.length > 0 || iss.carpentry.length > 0 || iss.complaints.length > 0 ? 'tenant-issues-expand' : null } >
                
                    <div>{iss.plumbing.length > 0 || iss.electrical.length > 0 || iss.carpentry.length > 0 || iss.complaints.length > 0 ? <h3><span>Alert</span><FontAwesomeIcon icon={faExclamationTriangle} style={{color: 'white', fontSize: '15px'}}/>{iss._userName} has {iss.carpentry.length + iss.plumbing.length + iss.electrical.length + iss.complaints.length} issues</h3> : null}</div>
                    <div className='shows'>
                    <div className='iss-list-container'>
                    {iss.plumbing.length > 0 ? <div className='ten-issues'><h3>Plumbing:</h3>{iss.plumbing.map((ish, index) => {return <div key={index} className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'plumbing']} style={ish.pending === true ? {backgroundColor: 'red'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'plumbing']} style={ish.recieved === true ? {backgroundColor: 'yellow'} : {backgroundColor: 'rgba(255,255,0, 0.1)'}}>Recieved</button>
                    <button onClick={props.changeCompleted} value={[ish._id, ish.completed, iss._user, 'plumbing']} style={ish.completed === true ? {backgroundColor: 'green'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                    {iss.electrical.length > 0 ? <div className='ten-issues'><h3>Electrical:</h3>{iss.electrical.map((ish, index) => {return <div key={index} className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'electrical']} style={ish.pending === true ? {backgroundColor: 'red'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'electrical']} style={ish.recieved === true ? {backgroundColor: 'yellow'} : {backgroundColor: 'rgba(255,255,0, 0.1)'}}>Recieved</button>
                    <button onClick={props.changeCompleted} value={[ish._id, ish.completed, iss._user, 'electrical']} style={ish.completed === true ? {backgroundColor: 'green'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                    {iss.carpentry.length > 0 ? <div className='ten-issues'><h3>Carpentry:</h3>{iss.carpentry.map((ish, index) => {return <div key={index} className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'carpentry']} style={ish.pending === true ? {backgroundColor: 'red'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'carpentry']} style={ish.recieved === true ? {backgroundColor: 'yellow'} : {backgroundColor: 'rgba(255,255,0, 0.1)'}}>Recieved</button>
                    <button onClick={props.changeCompleted} value={[ish._id, ish.completed, iss._user, 'carpentry']} style={ish.completed === true ? {backgroundColor: 'green'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                    {iss.complaints.length > 0 ? <div className='ten-issues'><h3>Complaints:</h3>{iss.complaints.map((ish, index) => {return <div key={index} className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'complaints']} style={ish.pending === true ? {backgroundColor: 'red'} : ish.recieved === true && ish.completed === true ? {backgroundColor: 'rgba(255, 0, 0, 0.2)'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'complaints']} className={ish.recieved === true ? "yellow" : ish.completed ===  true && ish.pending === true ? "dimYellow" : "dimYellow"} >Recieved</button>
                    <button onClick={props.changeCompleted}  value={[ish._id, ish.completed, iss._user, 'complaints', true]} style={ish.completed === true ? {backgroundColor: 'green'} : ish.pending === true && ish.recieved === true ? {backgroundColor: 'rgba(0, 255, 0, 0.1)'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                </div>
                </div>

                </div>
                })
                :null
                }

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandlordDashboard;