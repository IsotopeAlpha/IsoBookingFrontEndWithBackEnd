import "./navbar.css";
import { Link } from "react-router-dom";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () =>{
    const user = JSON.parse(localStorage.getItem("user"));

    return(
        <div className="navbar">
            <div className="newContainer">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <span className="logo">IsoBooking</span>
                </Link>
                {user?<div>
                    <FontAwesomeIcon icon={faPerson}/> {user.username}
                </div>:<div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar;