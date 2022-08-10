import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import pic from "../../images/vibe.jpg";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../components/reserve/Reserve";


const photos = [{ src: pic }, { src: pic }, { src: pic }, { src: pic }, { src: pic }, { src: pic }];

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideIndex, setSlideIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { data, loading } = useFetch(`http://localhost:8000/api/hotels/find/${id}`);

    const { dates, options } = useContext(SearchContext)

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const handleOpen = (i) => {
        setSlideIndex(i)
        setOpen(true);
    }

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideIndex === 0 ? 5 : slideIndex - 1
        } else {
            newSlideNumber = slideIndex === 5 ? 0 : slideIndex + 1
        }

        setSlideIndex(newSlideNumber)
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const handleBooking = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <Link to={`/upload/${id}`}><p>Upload</p></Link>
            {loading ? "loading..." : (<div className="hotelContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                    <div className="sliderWrapper">
                        <img src={photos[slideIndex].src} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
                </div>}
                <div className="hotelWrapper">
                    <buttton onClick={handleBooking} className="bookNow">Reserve or Book Now!</buttton>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address} in {data.city}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location - {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className="hotelImages">
                        {photos.map((photo, i) => (
                            <div className="hotelImgWrapper">
                                <img onClick={() => handleOpen(i)} src={photo.src} alt="" className="hotelImg" />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">
                                {data.description}
                            </p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                Located in the real heart of Kotaoka, this property has an excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                            </h2>
                            <button onClick={handleBooking}>Reserve or Book Now</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>)}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    )
}

export default Hotel;