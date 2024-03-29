import React, { useState } from 'react'
import '../sign_up/sign_up.css'
import backG from '../../images/back.jpeg'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { HiEye, HiEyeOff } from 'react-icons/hi';


export default function SignUp() {
    const [username, setUsername] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [city, setCity] = useState(undefined)
    const [phone, setPhone] = useState(undefined)
    const [country, setCountry] = useState(undefined)
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImage(reader.result);
        if (image) {
            console.log("2", image);
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        previewFile(file)
    }


    const handleSign = async () => {
        setLoading(true)
        const data = {
            username,
            password,
            email,
            city,
            phone,
            country,
            image
        }

        await axios.post("http://localhost:8000/api/auth/register", data).then((res) => {
            setLoading(false)
            if (res.status === 200) {
                console.log(res.data)
                Swal.fire(
                    'Sign Up',
                    res.data.msg,
                    'success'
                )
                return navigate('/')
            }
            else {
                Swal.fire(
                    'Sign Up',
                    res.data.message,
                    'error'
                )
            }
        }).catch(err => {
            console.log(err)
            setLoading(false)
            Swal.fire(
                'Sign Up',
                "Opps something went wrong",
                'error'
            )
        });


    }


    return (
        <div style={{ backgroundImage: `url(${backG})`, display: "flex", flexDirection: "column", justifyContent: "center", alignitems: "center", height: "100vh", backgroundSize: "cover" }}>


            <div className='sign-container' >
                <h2>
                    Sign Up
                </h2>
                <div className='sign-items'>
                    <div className='img-container'>
                        {image == null ? <div className='img'>
                        </div> : <img src={image} alt=" Profile pic" className='img' />}
                        <input type="file" onChange={handleImage}  /></div>
                    <div className='sign-input'>
                        <span>Username</span>
                        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} /></div>
                    <div className='sign-input'>
                        <span>Email</span>
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} /></div>
                    <div className='sign-input'>
                        <span>Country</span>
                        <input type="text" placeholder='Country' onChange={(e) => setCountry(e.target.value)} /></div>
                    <div className='sign-input'>
                        <span>City</span>
                        <input type="text" placeholder='City' onChange={(e) => setCity(e.target.value)} /></div>
                    <div className='sign-input'>
                        <span>Phone</span>
                        <input type="text" placeholder='Phone' onChange={(e) => setPhone(e.target.value)} /></div>
                    <div className='sign-input'>
                        <span>Password</span>
                        <div style={{ position: 'relative', height: '40px', width: '100%', borderRadius: '5px', padding: '2px', backgroundColor: 'white' }}>
                            <input type={passwordType} style={{ paddingRight: '7px', border: 'none', height: '100%', }} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            {passwordType === "password" ? <HiEye style={{ position: 'absolute', color: 'black', right: '10px', top: '15px', bottom: '15px' }} onClick={togglePassword} /> : <HiEyeOff style={{ position: 'absolute', color: 'black', right: '10px', top: '15px', bottom: '15px' }} onClick={togglePassword} />}
                        </div>
                    </div>

                    <button onClick={handleSign} disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                </div>
                <Link to="/" className="login">
                    Login
                </Link>
            </div>
        </div>
    )
}
