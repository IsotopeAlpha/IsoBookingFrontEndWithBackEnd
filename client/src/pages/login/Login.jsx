import axios from "axios";
import "../login/login.css";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


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
           
            localStorage.setItem("user", JSON.stringify(res.data));
               return navigate('/home')
            }
            else{
               Swal.fire(
                   'Login',
                   res.data.message,
                   'error'
               )
            }
        }).catch(err => {
            setLoading(false)
            Swal.fire(
                'Login',
                "Opps something went wrong",
                'error'
            )
        });
        
        
    }

    return(
        <div style={{display: "flex", backgroundColor:"gray", flexDirection: "column", justifyContent: "center", alignitems: "center", height: "100vh"}}>
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
        </div>
        </div>
        
    );
}

export default Login;