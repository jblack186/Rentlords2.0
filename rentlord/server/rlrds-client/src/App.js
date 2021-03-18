import React, {useState, useEffect} from 'react';
import Login from './Login';
import { Route } from 'react-router-dom';
import TDashboard from './TDashboard';
import LDashboard from './LDashboard';
import Role from './Role';
import LandlordPick from './LandlordPick';
import Setting from './Setting';
import axios from 'axios';
import './TDashboard.css';



const App = e => {
    const [landlord, setLandlord] = useState('');
    const [issues, setIssues] = useState([]);
    const [tenant, setTenant] = useState();
 
console.log(landlord)
  useEffect(() => {

    axios.get('/api/landlord-info')

        .then(res => {
            setLandlord(res.data)
        })
        .catch(err => {
        })
    axios.get('/api/tenants-issues')
        .then(res => {
            setIssues(res.data)
            console.log('response', res)
            
        })
        .catch(err => {
            console.log('err', err)

        })
    axios.get('/api/tenant')
        .then(res => {
            setTenant(res.data)
        })



}, [])
const changeRecieved = e => {
  // e.persist();
  const idStatus = e.target.value.split(',')
  if (idStatus[1] === 'true') {
  } else {
  }
  axios.put('/api/recieved', {ids: idStatus[0], _user: idStatus[2], situation: idStatus[3]})
      .then((res)=> {


      })
      .catch(err => {
      })
      axios.get('/api/tenants-issues')
      .then(res => {
          setIssues(res.data)
      })
      .catch(err => {
      })

}

const changeCompleted = (e) => {
  const idStatus = e.target.value.split(',')
  if (idStatus[1] === 'true') {
  } else {
  }
  axios.put('/api/completed', {ids: idStatus[0], _user: idStatus[2], situation: idStatus[3]})
      .then(res => {

      })
      .catch(err => {
      })
      axios.get('/api/tenants-issues')
      .then(res => {
          setIssues(res.data)
      })
      .catch(err => {
      })

}

const changeSituation = e => {

  e.persist();
  const idStatus = e.target.value.split(',')
  if (idStatus[1] === 'true') {
  } else {
  }
  axios.put('/api/pending', {ids: idStatus[0], _user: idStatus[2], situation: idStatus[3]})
      .then(res => {



      })
      .catch(err => {
      })
      axios.get('/api/tenants-issues')
      .then(res => {
          setIssues(res.data)
      })
      .catch(err => {
      })
  
}


  return (
    <div>
            <Route exact path='/login' render= {(props) => { return <Login  {...props}  />}} />
            <Route exact path='/tenant-dashboard' render= {(props) => { return <TDashboard tenant={tenant} {...props}  />}} />
            <Route exact path='/landlord-dashboard' render= {(props) => { return <LDashboard changeSituation={changeSituation} changeCompleted={changeCompleted} changeRecieved={changeRecieved} landlord={landlord} issues={issues} {...props}  />}} />
            <Route exact path='/role' render= {(props) => { return <Role  {...props}  />}} />
            <Route exact path='/landlord-pick' render= {(props) => { return <LandlordPick  {...props}  />}} />
            <Route exact path='/settings' render= {(props) => { return <Setting {...props} />}} />

    </div>
  );
}

export default App;
