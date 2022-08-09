import axios from "axios";
import "../login/login.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import backG from '../../images/back.jpeg'
import { Link } from "react-router-dom";

const Login=()=>{
    const [username, setUsername] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    const forward = ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
    
        if(user){
            return navigate("/home");
        }
    }
    forward();
    
    const handleLogin = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const data = {
            username,
            password,
        }

        await axios.post("http://localhost:8000/api/auth/login", data).then((res) => {
            setLoading(false)
            if(res.status === 200){
                console.log(res.data)
            localStorage.setItem("user", JSON.stringify(res.data.details));
            Swal.fire(
                'Login',
                res.data.msg,
                'success'
            )
               return navigate('/home')
            }
            else{
               Swal.fire(
                   'Login',
                   res.msg,
                   'error'
               )
            }
        }).catch(err => {
            setLoading(false)
            console.log(err)
            Swal.fire(
                'Login',
                "Opps something went wrong",
                'error'
            )
        });
        
        
    }

    return(
        <div style={{backgroundImage: `url(${backG})`,display: "flex", flexDirection: "column", justifyContent: "center", alignitems: "center", height: "100vh",  backgroundSize: "cover"}}>
            <div className="loginContainer">
            <h2>Login</h2>
            <form className="loginForm" onSubmit={handleLogin}>
                <div className="loginEdit">
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="E.g. Isotope"/>
                </div>
                <div className="loginEdit">
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********"/>
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
            </form>
            <Link to="/sign" className="sign">
                Sign Up
            </Link>
        </div>
        </div>
        
    );
}

export default Login;