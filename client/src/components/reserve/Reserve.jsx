import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";


const Reserve = ({setOpen, hotelId}) =>{
    const [selectedRooms, setSelectedRooms] = useState([]);
    const {data, loading, error} = useFetch(`http://localhost:8000/api/hotels/room/${hotelId}`);
    const {dates} = useContext(SearchContext)
    
    const handleSelect = (e) =>{
        const checked = e.target.checked;
        const value = e.target.value;

        setSelectedRooms(checked?[...selectedRooms, value]:selectedRooms.filter((item)=>item!==value));


    }

    const getDatesInRange = (startDate, endDate) =>{
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date  = new Date(start.getTime());
        let list = [];
        while(date<=end){
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1);
        }
        return list;
    }

     const allDates = getDatesInRange(dates[0].endDate, dates[0].startDate);
    // const isAvailable  =  [];
    const isAvailable = (roomNumber)=>{
        const isFound = roomNumber.unavailableDates.some(date=>allDates.includes(new Date(date).getTime())
           );
           return !isFound;
    }

    const navigate  = useNavigate();
    const handleResrve = async() => {
        try {
            await Promise.all(selectedRooms.map((roomId)=>{
                const res = axios.put(`http://localhost:8000/api/hotels/rooms/availability${roomId}`, {dates:[]});
            
                console.log(res.data)
                return res.data;
            }));
            setOpen(false);
            Swal.fire(
                'Reserve',
                "Reservation Successful"
            )
            navigate('/home')
        } catch (err) {
        }
    };

    return(
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)} />
            <span>Select your rooms:</span>
            {data.map( (item) => (
                <div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.description}</div>
                        <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectedRooms">
                        {item.roomNumbers.map((roomNumber)=>(
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox"  value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable}/>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
            <button onClick={handleResrve} className="rButton">Reserve Now</button>
        </div>
    </div>);
};

export default Reserve;