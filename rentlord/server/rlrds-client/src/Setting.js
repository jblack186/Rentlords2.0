import React, {useState} from 'react';
import axios from 'axios';
import './Setting.css';
import SideBar from './SideBar';


const Settings = (props) => {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')
    const [imageName, setImageName] = useState('')
    const [newPic, setNewPic] = useState(false)
    

//cloudinary upload
const uploadImage = async e => {
    const files = e.target.files
    console.log(files[0].size)
    if (files[0].size < 124000) {
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'rentlords')
    setLoading(true)
    const res = await fetch(
        'https://api.cloudinary.com/v1_1/drgfyozzd/image/upload',
        {
            method: 'POST',
            body: data
        }
    )
    const file = await res.json()

    setImage(file.secure_url);
    setImageName(`${file.public_id}.${file.format}`)
    setLoading(false)
    } else {
        alert('The file you have chosen is to big. Must be under __ ')
    }
}



    const submitImage = (e) => {
        e.preventDefault();
        axios.put('/api/picture', { url: imageName } )
        .then(res => {
            if(res.status === 200) {
              setNewPic(true)
            }
        })
        .catch(err =>
            console.log(err))
     
  }

        return (
            <div className='setting-contain'>
                <SideBar />
                <div className='content-contain'>
                <form onSubmit={submitImage}>
                    <input name="file" type="file" onChange={uploadImage} placeholder='Upload an image' />
                    <button type='submit'>Upload</button>
                </form>
                {loading ? (
                    <h3 style={{ paddingLeft: '100px', color: 'white'}} >Loading...</h3>
                ): (
                <img src={image}  alt=''/>
                )}
               {props.landlord ? <img className={newPic === true ? 'pic-hide' : null}  src={`https://res.cloudinary.com/drgfyozzd/image/upload/${props.landlord.picture}`} alt=''/> : null}
            </div>
            </div>
        )
    }


export default Settings;
