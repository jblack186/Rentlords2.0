import React from 'react';
import {Link} from 'react-router-dom';
import './SideBar.css'
import {faUser, faGlasses, faWrench, faDoorClosed} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';

const SideBar = (props) => {
console.log(props.pic)
    return (
            <div className='sidebar'>
                <div className='siding-contain'>
                <ul className='side-list'>
                    <li className='list-item'>
                    <FontAwesomeIcon icon={faGlasses} style={{color: 'white', fontSize: '20px', borderRadius: '20px'}}/>

                    <Link style={{ fontSize: '80%', color: 'white', listStyle: 'none', textDecoration: 'none'}} to={ localStorage.getItem('Role') === 'Landlord' ? './landlord-dashboard' : './tenant-dashboard'}>Dashboard</Link>
                    </li>
                    <li className='list-item'>
                    <FontAwesomeIcon icon={faWrench} style={{color: 'white', fontSize: '20px', borderRadius: '20px'}}/>

                        <Link style={{fontSize: '80%', color: 'white', listStyle: 'none', textDecoration: 'none'}} to='/settings'>Settings</Link>
                    </li>
                    <li className='list-item'>
                    <FontAwesomeIcon icon={faDoorClosed} style={{color: 'white', fontSize: '20px', borderRadius: '20px'}}/>
                        <a  style={{fontSize: '80%', textDecoration: 'none', color: 'white', listStyle: 'none'}} href='/api/logout'>Logout</a>
                    </li>
                </ul>
                </div>
                <div className='username'>
                {props.pic === undefined || !props.pic ? <FontAwesomeIcon icon={faUser} style={{color: 'white', fontSize: '20px', borderRadius: '20px'}}/> : <img style={{width: '50px', borderRadius: '20px'}} src={`https://res.cloudinary.com/drgfyozzd/image/upload/${props.pic}`} alt='this is you' /> }
                    <p style={{color: "white"}}>{props.landlord ? props.landlord : <p>Loading</p> }</p>
                </div>


            </div>

    )
}

export default SideBar;