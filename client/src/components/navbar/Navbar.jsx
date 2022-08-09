import "./navbar.css";
import { Link } from "react-router-dom";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
const Navbar = () =>{
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('user');
        navigate('/')
    }
    const handleLogin = () =>{
        navigate('/')
    }

    return(
        <div className="navbar">
            <div className="newContainer">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <span className="logo">IsoBooking</span>
                </Link>
                {user?<div>
                    <FontAwesomeIcon icon={faPerson}/> {user.username} <button className="navButton" onClick={handleLogout}>Logout</button>
                </div>:<div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton" onClick={handleLogin}>Login</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar;