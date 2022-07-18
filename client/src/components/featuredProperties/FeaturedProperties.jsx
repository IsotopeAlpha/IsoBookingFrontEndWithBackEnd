import "./featuredProperties.css";
import pic from "../../images/vibe.jpg";
import useFetch from '../../hooks/useFetch.js';

const FeaturedProperties = () =>{
    const {data, loading, error} = useFetch("http://localhost:8000/api/hotels?featured=true&limit=4");
    return(
        <div className="fp">
            {loading?"Loading Featured Properties...":<>{data.map(item=>(
                <div className="fpItem" id={item._id}>
                {item.photos[0]?<img src={item.photos[0]} alt="" className="fpImg" />:<img src={pic} alt="" className="fpImg" />}
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
               {item.rating&&<div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                </div>} 
            </div>
            ))}</>}
                
        </div>
    );
}

export default FeaturedProperties;