import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Role.css';


const Role = () => {
    const [chooseRole, setChooseRole] = useState('');
    const history = useHistory();

    console.log(chooseRole)

    const changeRoleTenant = (e) => {
        e.preventDefault();
        setChooseRole('Tenant')
        e.target.style.border = 'blue 3px solid'

    }

    const changeRoleLandlord = (e) => {
        e.preventDefault();
        setChooseRole('Landlord')
        e.target.style.border = 'blue 3px solid'

    }


    const newRole = e => {
        axios.put('/api/role', {role: chooseRole} )
        .then(response => {
                    console.log(response)

        })
        .catch(err => {
            console.log(err)
        })
        if(chooseRole === 'Tenant') {
            axios.post('/api/issues', { message: []})
            .then(response => {
                console.log(response)
              })
            .catch(error => {
                console.log(error)
            })
    
            history.push('/landlord-pick')
        } else {
            history.push('/landlord-dashboard')
        }


    }


    return (
        <div>
                <form className='role-contain' onSubmit={newRole}>
                    <div className='landlord-role-contain'>
                    <p>I am a Landlord</p>
                        <button type='submit' value='Landlord' onClick={changeRoleLandlord}>
                        <img className='landlord-image' value='Landlord' onClick={changeRoleLandlord} src='https://images.pexels.com/photos/955395/pexels-photo-955395.jpeg?cs=srgb&dl=two-person-in-long-sleeved-shirt-shakehand-955395.jpg&fm=jpg' alt='what a handshake'/>
                        </button>
                    <button className='next' type='submit'>Go to Dashboard</button>
                    </div>
                    <div className='tenant-role-contain'>
                        <p>I am a Tenant</p>
                        <button type='submit' value='Tenant' onClick={changeRoleTenant}>
                        <img className='tenant-image' src='https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260' alt='nice apartment'/>
                        </button>
                    <button className='next' type='submit'>Go to Dashboard</button>
                    </div>
                </form>
        </div>
    )
}

export default Role;